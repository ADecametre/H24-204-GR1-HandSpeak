import cv2
from cvzone.HandTrackingModule import HandDetector
import numpy as np
import math
import time

# Initialisation de la capture vidéo à partir de la webcam
cap = cv2.VideoCapture(0)

# Initialisation du détecteur de main avec un maximum d'une main
detector = HandDetector(maxHands=1)

# Ajoute un espace de 20px pour la détection de la main (essaie de jouer avec la valeur 
# pour voir comment cela affecte la deuxième fênetre "ImageWhite")
offset = 20

# Taille de l'image (tous les images sont de taille fixe de 300x300 pour que l'IA puisse
# les traiter facilement)
imgSize = 300

# Dossier contenant les images de la main entrain de faire les signes
folder = "Data/C"

# Compteur pour savoir combien d'images ont été enregistrées dans le dossier
counter = 0

while True:
    # Lecture de l'image à partir de la webcam
    success, img = cap.read()

    # Détection des mains dans l'image
    hands, img = detector.findHands(img)

    # Si une main est détectée
    if hands:
        # Récupération de la première main détectée (on s'en fou des autres mains)
        hand = hands[0]

        # Récupération de la boîte englobante de la main
        x, y, w, h = hand['bbox']

        # Création d'une image blanche de taille 300x300
        imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255

        # Découpage de l'image autour de la main en tenant compte du offset
        imgCrop = img[y - offset:y + h + offset, x - offset:x + w + offset]

        # Calcul du ratio d'aspect de la main
        aspectRatio = h / w

        # Si le ratio d'aspect est supérieur à 1 (la main est plus haute que large)
        # la hauteur restera la même (300px) et la largeur sera ajustée en conséquence
        # cela serait l'inverse si la main est plus large que haute
        if aspectRatio > 1:
            # Calcul du facteur de mise à l'échelle
            k = imgSize / h

            # Calcul de la largeur ajustée
            wCal = math.ceil(k * w)

            # Si l'image découpée existe et n'a pas subi une erreur quelconque
            if imgCrop is not None and imgCrop.size > 0: 

            # Redimensionnement de l'image découpée
                imgResize = cv2.resize(imgCrop, (wCal, imgSize))

                # Calcul de l'écart en largeur afin de centrer l'image redimensionnée
                wGap = math.ceil((imgSize - wCal) / 2)

                # Placement de l'image redimensionnée sur l'image blanche
                imgWhite[:, wGap:wCal + wGap] = imgResize

            else:
                print("imgCrop is empty")

        # Si le ratio d'aspect est inférieur à 1, on fait exactement la même chose qu'en haut
        # mais cette fois-ci la largeur restera la même (300px) et la hauteur sera ajustée
        else:
            k = imgSize / w

            hCal = math.ceil(k * h)

            if imgCrop is not None and imgCrop.size > 0:

                imgResize = cv2.resize(imgCrop, (imgSize, hCal))

                imgResizeShape = imgResize.shape

                hGap = math.ceil((imgSize - hCal) / 2)

                imgWhite[hGap:hCal + hGap, :] = imgResize

                cv2.imshow("ImageCrop", imgCrop)

        # Affichage de l'image blanche
        cv2.imshow("ImageWhite", imgWhite)

    # Affichage de l'image originale
    cv2.imshow("Image", img)

    # Attente d'une touche du clavier
    key = cv2.waitKey(1)

    # Si la touche 's' est pressée
    if key == ord("s"):
        # Incrémentation du compteur
        counter += 1

        # Enregistrement de l'image blanche dans le dossier spécifié
        cv2.imwrite(f'{folder}/Image_{time.time()}.jpg',imgWhite)

        print(counter)