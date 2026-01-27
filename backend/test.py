from ultralytics import YOLO
import cv2
import json

# Load ONNX model
model = YOLO("model/best1.onnx")

# Load test image
img = cv2.imread("crackImageTest.jpg")

if img is None:
    print("❌ Image not found. Check test.jpg path")
    exit()

# Run inference
results = model(img)

# Print detections
if len(results[0].boxes) == 0:
    print("⚠️ No cracks detected")
else:
    print(f"✅ Detections found: {len(results[0].boxes)}")

# Prepare JSON response
detections = []
for r in results:
    for box in r.boxes:
        detections.append({
            "class_id": int(box.cls[0]),
            "class_name": model.names[int(box.cls[0])],
            "confidence": float(box.conf[0]),
            "bbox": box.xyxy[0].tolist()  # [x1, y1, x2, y2]
        })

# Print JSON response
json_response = {
    "message": "Detection successful",
    "detections": detections
}
print("\n📋 JSON Response:")
print(json.dumps(json_response, indent=2))

# Draw boxes
for box in results[0].boxes:
    x1, y1, x2, y2 = map(int, box.xyxy[0])
    conf = float(box.conf[0])
    cls = int(box.cls[0])
    class_name = model.names[cls]
    
    # Draw rectangle
    cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 3)
    
    # Create label text
    label = f"{class_name} {conf:.2f}"
    
    # Get text size to create background
    (text_width, text_height), baseline = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.7, 2)
    
    # Ensure label is within image bounds
    label_y = max(y1 - 10, text_height + 10)
    
    # Draw background rectangle for text
    cv2.rectangle(img, (x1, label_y - text_height - 10), 
                  (x1 + text_width, label_y + baseline), 
                  (0, 255, 0), cv2.FILLED)
    
    # Draw text
    cv2.putText(img, label, (x1, label_y - 5),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 2)

# Save output
cv2.imwrite("output.jpg", img)
print("🖼️ Output saved as output.jpg")
