"""
Simple YOLO Image Analysis API with Snowflake storage
Upload an image -> Analyze with YOLO -> Store in Snowflake -> Return results
"""
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import cv2
import numpy as np
import uuid
import os
import tempfile
from datetime import datetime
from typing import List, Dict, Any
import json

# Load environment variables from .env file
try:
    from dotenv import load_dotenv
    load_dotenv()
    print("✅ Environment variables loaded from .env file")
except ImportError:
    print("⚠️  python-dotenv not installed. Install with: pip install python-dotenv")
except Exception as e:
    print(f"⚠️  Could not load .env file: {e}")

# Database imports (optional Snowflake)
try:
    import snowflake.connector
    from dotenv import load_dotenv
    load_dotenv()  # Load environment variables from .env file
    SNOWFLAKE_AVAILABLE = True
except ImportError:
    SNOWFLAKE_AVAILABLE = False

# YOLO model imports
try:
    import onnxruntime as ort
    MODEL_AVAILABLE = True
except ImportError:
    MODEL_AVAILABLE = False

app = FastAPI(title="Simple YOLO Analysis API", version="1.0.0")

# Configuration
MODEL_PATH = "model/best1.onnx"
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Snowflake connection settings (set these as environment variables)
SNOWFLAKE_CONFIG = {
    'account': os.getenv('SNOWFLAKE_ACCOUNT'),
    'user': os.getenv('SNOWFLAKE_USER'),
    'password': os.getenv('SNOWFLAKE_PASSWORD'),
    'database': os.getenv('SNOWFLAKE_DATABASE', 'CODEX26'),
    'schema': os.getenv('SNOWFLAKE_SCHEMA', 'INSPECTION'),
    'warehouse': os.getenv('SNOWFLAKE_WAREHOUSE')
}

# Load YOLO model
session = None
if MODEL_AVAILABLE and os.path.exists(MODEL_PATH):
    try:
        session = ort.InferenceSession(MODEL_PATH)
        print(f"✅ YOLO model loaded: {MODEL_PATH}")
    except Exception as e:
        print(f"⚠️  Model loading failed: {e}")

def preprocess_image(image, img_size=640):
    """Preprocess image for YOLO inference"""
    img = cv2.resize(image, (img_size, img_size))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = img / 255.0
    img = img.transpose(2, 0, 1)  # HWC → CHW
    img = np.expand_dims(img, axis=0).astype(np.float32)
    return img

def run_yolo_inference(image_path: str) -> List[Dict[str, Any]]:
    """Run YOLO inference on uploaded image"""
    if not session:
        # Return mock data if model not available
        return [{
            "defect_type": "crack",
            "confidence": 0.85,
            "bbox": {"x1": 100, "y1": 150, "x2": 300, "y2": 250},
            "severity": "medium"
        }]
    
    # Load and preprocess image
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Could not load image")
    
    processed_img = preprocess_image(image)
    
    # Run inference
    input_name = session.get_inputs()[0].name
    outputs = session.run(None, {input_name: processed_img})
    
    # Process outputs (simplified - adjust based on your YOLO model output format)
    detections = []
    if outputs and len(outputs[0]) > 0:
        # This is a simplified example - adjust based on your model's output format
        for detection in outputs[0][0]:  # Assuming first output, first batch
            confidence = float(detection[4]) / 100.0  # Convert percentage to 0-1 range
            if confidence > 0.04:  # Confidence threshold (4% minimum confidence)
                detections.append({
                    "defect_type": "crack",  # Map class ID to defect type
                    "confidence": confidence,
                    "bbox": {
                        "x1": float(detection[0]),
                        "y1": float(detection[1]),
                        "x2": float(detection[2]),
                        "y2": float(detection[3])
                    },
                    "severity": "high" if confidence > 0.8 else "medium" if confidence > 0.6 else "low"
                })
    
    return detections

def analyze_with_cortex_llm(detections: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Use Snowflake Cortex LLM to analyze YOLO detections and provide risk assessment"""
    if not SNOWFLAKE_AVAILABLE or not all([
        SNOWFLAKE_CONFIG['account'], 
        SNOWFLAKE_CONFIG['user'], 
        SNOWFLAKE_CONFIG['password']
    ]):
        # Fallback: Simple rule-based analysis if Snowflake not available
        return generate_fallback_analysis(detections)
    
    try:
        # Connect to Snowflake
        conn = snowflake.connector.connect(**{k:v for k,v in SNOWFLAKE_CONFIG.items() if v})
        cursor = conn.cursor()
        
        # Prepare detection summary for LLM
        detection_summary = {
            "total_detections": len(detections),
            "detections": detections
        }
        
        # Create prompt for Cortex LLM
        prompt = f"""
        You are a structural engineering AI assistant analyzing building defects detected by a YOLO model.
        
        YOLO Detection Results:
        {json.dumps(detection_summary, indent=2)}
        
        Please analyze these detections and provide:
        1. Risk Score (0-100): Overall structural risk based on number, confidence, and type of defects
        2. Risk Level: LOW, MEDIUM, HIGH, CRITICAL
        3. Plain Language Summary: Describe the findings in simple terms
        4. Recommendations: Specific actions to take
        5. Urgency: IMMEDIATE, URGENT, MODERATE, LOW
        
        Format your response as valid JSON with these exact keys:
        {{
            "risk_score": <number 0-100>,
            "risk_level": "<LOW|MEDIUM|HIGH|CRITICAL>",
            "summary": "<plain language description>",
            "recommendations": ["<action1>", "<action2>"],
            "urgency": "<IMMEDIATE|URGENT|MODERATE|LOW>"
        }}
        """
        
        # Use Snowflake Cortex Complete function
        sql_query = """
        SELECT SNOWFLAKE.CORTEX.COMPLETE(
            'llama2-70b-chat', 
            %s
        ) as llm_response
        """
        
        cursor.execute(sql_query, (prompt,))
        result = cursor.fetchone()
        
        if result and result[0]:
            # Parse LLM response
            llm_response = result[0]
            try:
                # Extract JSON from LLM response
                import re
                json_match = re.search(r'\{.*\}', llm_response, re.DOTALL)
                if json_match:
                    analysis = json.loads(json_match.group())
                else:
                    # If no valid JSON, create structured response
                    analysis = {
                        "risk_score": min(len(detections) * 25, 100),
                        "risk_level": "HIGH" if len(detections) > 3 else "MEDIUM",
                        "summary": llm_response[:200] + "..." if len(llm_response) > 200 else llm_response,
                        "recommendations": ["Professional inspection required"],
                        "urgency": "URGENT" if len(detections) > 3 else "MODERATE"
                    }
            except json.JSONDecodeError:
                # Fallback if JSON parsing fails
                analysis = generate_fallback_analysis(detections)
                analysis["llm_raw_response"] = llm_response
        else:
            analysis = generate_fallback_analysis(detections)
        
        cursor.close()
        conn.close()
        
        return analysis
        
    except Exception as e:
        print(f"❌ Cortex LLM analysis failed: {e}")
        return generate_fallback_analysis(detections)

def generate_fallback_analysis(detections: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Generate analysis without LLM - rule-based fallback"""
    total_detections = len(detections)
    high_confidence_detections = len([d for d in detections if d['confidence'] > 0.7])
    avg_confidence = sum(d['confidence'] for d in detections) / total_detections if detections else 0
    
    # Calculate risk score (0-100)
    risk_score = min(
        (total_detections * 15) + 
        (high_confidence_detections * 20) + 
        (avg_confidence * 30), 
        100
    )
    
    # Determine risk level
    if risk_score >= 80:
        risk_level = "CRITICAL"
        urgency = "IMMEDIATE"
    elif risk_score >= 60:
        risk_level = "HIGH"
        urgency = "URGENT"
    elif risk_score >= 30:
        risk_level = "MEDIUM"
        urgency = "MODERATE"
    else:
        risk_level = "LOW"
        urgency = "LOW"
    
    # Generate summary
    if total_detections == 0:
        summary = "No structural defects detected. Building appears to be in good condition."
        recommendations = ["Continue regular maintenance schedule"]
    elif total_detections == 1:
        summary = f"One crack detected with {avg_confidence:.1%} confidence. Minor structural concern identified."
        recommendations = ["Monitor crack for changes", "Consider professional assessment"]
    else:
        summary = f"{total_detections} cracks detected with average {avg_confidence:.1%} confidence. Multiple structural concerns identified."
        recommendations = ["Professional structural inspection required", "Consider immediate safety assessment"]
    
    return {
        "risk_score": int(risk_score),
        "risk_level": risk_level,
        "summary": summary,
        "recommendations": recommendations,
        "urgency": urgency,
        "analysis_method": "rule_based_fallback"
    }

def save_to_snowflake(inspection_data: Dict[str, Any]) -> bool:
    """Save inspection results to Snowflake"""
    if not SNOWFLAKE_AVAILABLE or not all([
        SNOWFLAKE_CONFIG['account'], 
        SNOWFLAKE_CONFIG['user'], 
        SNOWFLAKE_CONFIG['password']
    ]):
        print("⚠️  Snowflake not configured, skipping database save")
        return False
    
    try:
        # Connect to Snowflake
        conn = snowflake.connector.connect(**{k:v for k,v in SNOWFLAKE_CONFIG.items() if v})
        cursor = conn.cursor()
        
        # Create table if not exists (simplified schema)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS INSPECTIONS (
            inspection_id STRING,
            image_name STRING,
            detections VARIANT,
            created_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
        )
        """)
        
        # Insert inspection data
        cursor.execute(
            "INSERT INTO INSPECTIONS (inspection_id, image_name, detections) VALUES (%s, %s, %s)",
            (inspection_data['inspection_id'], inspection_data['image_name'], json.dumps(inspection_data['detections']))
        )
        
        conn.commit()
        cursor.close()
        conn.close()
        
        print(f"✅ Saved to Snowflake: {inspection_data['inspection_id']}")
        return True
        
    except Exception as e:
        print(f"❌ Snowflake save failed: {e}")
        return False

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    """
    Analyze uploaded image with YOLO and store results in Snowflake
    """
    try:
        # Validate file
        if not file.filename.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp')):
            raise HTTPException(status_code=400, detail="Invalid file type. Use JPG, PNG, or BMP.")
        
        # Save uploaded file
        file_ext = file.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_ext}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        # Run YOLO inference
        detections = run_yolo_inference(file_path)
        
        # Enhanced: Analyze with Cortex LLM for risk assessment
        risk_analysis = analyze_with_cortex_llm(detections)
        
        # Prepare inspection data
        inspection_id = str(uuid.uuid4())
        inspection_data = {
            "inspection_id": inspection_id,
            "image_name": file.filename,
            "detections": detections,
            "risk_analysis": risk_analysis,
            "timestamp": datetime.now().isoformat()
        }
        
        # Save to Snowflake
        db_saved = save_to_snowflake(inspection_data)
        
        # Clean up uploaded file (optional)
        # os.remove(file_path)
        
        return JSONResponse(content={
            "success": True,
            "inspection_id": inspection_id,
            "image_name": file.filename,
            "detections": detections,
            "total_detections": len(detections),
            "risk_analysis": risk_analysis,
            "saved_to_database": db_saved
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Simple YOLO Analysis API",
        "model_loaded": session is not None,
        "snowflake_available": SNOWFLAKE_AVAILABLE,
        "endpoints": ["/analyze", "/docs"]
    }

@app.get("/health")
async def health():
    """Detailed health check"""
    return {
        "status": "healthy",
        "yolo_model": "loaded" if session else "not_available",
        "snowflake": "configured" if SNOWFLAKE_AVAILABLE and SNOWFLAKE_CONFIG['account'] else "not_configured",
        "upload_dir": UPLOAD_DIR
    }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Simple YOLO Analysis API...")
    print("📖 API docs: http://localhost:8003/docs")
    print("🔗 Test endpoint: http://localhost:8003/")
    print("Press Ctrl+C to stop the server")
    uvicorn.run(app, host="127.0.0.1", port=8003, log_level="info")