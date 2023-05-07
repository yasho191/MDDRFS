# 5981 × 3164
import cv2

img = cv2.imread("retinal_image.jpeg", cv2.IMREAD_COLOR)
img = cv2.resize(img, (5981, 3164))
cv2.imwrite("retinal_image_1.jpeg", img)