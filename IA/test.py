import cv2
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
import numpy as np
import math

cap = cv2.VideoCapture(0)
detector = HandDetector(maxHands=1)

# Initialisation du classificateur avec le modèle et les labels spécifiés
classifier = Classifier("IA\Model\keras_model.h5", "IA\Model\labels.txt")

offset = 20
imgSize = 300
folder = "Data/C"
counter = 0
labels = ["A", "B", "C"]

while True:
    success, img = cap.read()
    imgOutput = img.copy()
    hands, img = detector.findHands(img)

    if hands:
        hand = hands[0]
        x, y, w, h = hand['bbox']
        imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
        imgCrop = img[y - offset:y + h + offset, x - offset:x + w + offset]
        imgCropShape = imgCrop.shape
        aspectRatio = h / w
        if aspectRatio > 1:
            k = imgSize / h
            wCal = math.ceil(k * w)
            if imgCrop is not None and imgCrop.size > 0: 
                imgResize = cv2.resize(imgCrop, (wCal, imgSize))
                imgResizeShape = imgResize.shape
                wGap = math.ceil((imgSize - wCal) / 2)
                imgWhite[:, wGap:wCal + wGap] = imgResize

                # Obtenir la prédiction du classificateur pour l'image blanche
                prediction, index = classifier.getPrediction(imgWhite, draw=False)
                print(prediction, index)

            else:
                print("imgCrop is empty")
        else:
            k = imgSize / w
            hCal = math.ceil(k * h)
            if imgCrop is not None and imgCrop.size > 0: 
                imgResize = cv2.resize(imgCrop, (imgSize, hCal))
                imgResizeShape = imgResize.shape
                hGap = math.ceil((imgSize - hCal) / 2)
                imgWhite[hGap:hCal + hGap, :] = imgResize


                prediction, index = classifier.getPrediction(imgWhite, draw=False)

        # Dessiner un rectangle rempli sur l'image de sortie. 
                #Ce rectangle servira de fond pour le texte qui vient après.
        cv2.rectangle(imgOutput, (x - offset, y - offset-50),
                      (x - offset+90, y - offset-50+50), (255, 0, 255), cv2.FILLED)
        
        # Ajouter le texte de la prédiction sur l'image de sortie (A, B, C, etc.)
        cv2.putText(imgOutput, labels[index], (x, y -26), cv2.FONT_HERSHEY_COMPLEX, 1.7, (255, 255, 255), 2)

        # Calculer la probabilité de la prédiction en pourcentage
        probability = prediction[index] * 100 
        
        (label_width, _), _ = cv2.getTextSize(labels[index], cv2.FONT_HERSHEY_COMPLEX, 1.7, 2)

        # Ajouter le texte de la probabilité sur l'image de sortie, à côté du texte du label
        cv2.putText(imgOutput, f" {probability:.2f}%", (x + label_width, y - 26), cv2.FONT_HERSHEY_COMPLEX, 1.7, (255, 255, 255), 2)
        
        # Dessiner un rectangle autour de la main
        cv2.rectangle(imgOutput, (x-offset, y-offset),
                      (x + w+offset, y + h+offset), (255, 0, 255), 4)
        
        if imgCrop is not None and imgCrop.size > 0: 
            cv2.imshow("ImageCrop", imgCrop)
        cv2.imshow("ImageWhite", imgWhite)
    cv2.imshow("Image", imgOutput)
    cv2.waitKey(1)