from PIL import Image
import pytesseract
import numpy as np

from cv2 import cv

#removing the extra noise from the image
import cv2norm_img = np.zeros((img.shape[0], img.shape[1]))
img = cv2.normalize(img, norm_img, 0, 255, cv2.NORM_MINMAX)
img = cv2.threshold(img, 100, 255, cv2.THRESH_BINARY)[1]
img = cv2.GaussianBlur(img, (1, 1), 0)


filename = str
image = cv2.imread(filename)