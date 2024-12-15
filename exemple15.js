// exemple15.js

let sketch15 = function(p) {
    let rotationXAngle = 0;
    let rotationYAngle = 0;

    p.setup = function() {
        // Sélectionner le conteneur
        const container = p.select('#exemple15Container');
        if (!container) {
            console.error("Conteneur '#exemple15Container' non trouvé");
            return;
        }

        // Définir les dimensions du canvas
        let canvasWidth = p.windowWidth / 3;
        let canvasHeight = p.windowHeight / 3;

        // Créer le canvas en mode WEBGL et le parenté au conteneur
        let cnv = p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);
        cnv.parent('exemple15Container');

        // Décrire le contenu pour l'accessibilité
        p.describe('a 3d example containing seven primitive objects, a plane, box, cylinder, cone, torus, sphere, and ellipsoid.');
    };

    p.windowResized = function() {
        // Recalculer les dimensions du canvas
        let canvasWidth = p.windowWidth / 3;
        let canvasHeight = p.windowHeight / 3;
        p.resizeCanvas(canvasWidth, canvasHeight);
    };

    p.draw = function() {
        p.background(245);

        // Calcul des angles de rotation basés sur la position de la souris
        rotationYAngle = p.map(p.mouseX, 0, p.width, -p.PI, p.PI);
        rotationXAngle = p.map(p.mouseY, 0, p.height, -p.PI, p.PI);

        p.normalMaterial(); // Appliquer un matériau normal pour des couleurs par défaut

        // Dessiner chaque forme avec les rotations basées sur la souris
        // Utiliser .bind(p) pour lier le contexte p
        p.drawShape(-150, -80, 0, 35, p.plane.bind(p));
        p.drawShape(0, -80, 0, 35, p.box.bind(p));
        p.drawShape(150, -80, 0, 35, p.cylinder.bind(p));
        p.drawShape(-150, 80, 0, 25, p.cone.bind(p), 35);
        p.drawShape(-50, 80, 0, 25, p.torus.bind(p), 10);
        p.drawShape(50, 80, 0, 25, p.sphere.bind(p));
        p.drawShape(150, 80, 0, 15, p.ellipsoid.bind(p), 20, 20);
    };

    /**
     * Fonction pour dessiner une forme avec des transformations spécifiques
     * @param {number} x - Position X
     * @param {number} y - Position Y
     * @param {number} z - Position Z
     * @param {number} size - Taille de la forme
     * @param {function} shapeFunc - Fonction de dessin de la forme (liée à p)
     * @param {number} [param1] - Paramètre supplémentaire pour certaines formes
     * @param {number} [param2] - Paramètre supplémentaire pour certaines formes
     */
    p.drawShape = function(x, y, z, size, shapeFunc, param1, param2) {
        p.push();
        p.translate(x, y, z);
        p.rotateX(rotationXAngle);
        p.rotateY(rotationYAngle);
        p.rotateZ((rotationXAngle + rotationYAngle) / 2); // Rotation autour de Z basée sur X et Y
        if (param1 !== undefined && param2 !== undefined) {
            shapeFunc(size, param1, param2);
        } else if (param1 !== undefined) {
            shapeFunc(size, param1);
        } else {
            shapeFunc(size);
        }
        p.pop();
    };
};

new p5(sketch15);
