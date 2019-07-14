/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface
{
    constructor()
    {
        super();
    }

    init(application)
    {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        // Modo de iluminação
        this.gui.add(this.scene, 'lightMode', this.scene.LIGHT_MODES).name('Iluminação').onChange(this.scene.setLightMode.bind(this.scene));

        // Ligar/desligar texturas
        this.gui.add(this.scene, 'texturesEnabled').name('Texturas').onChange(this.scene.enableTextures.bind(this.scene));
        

        /////////////////////////////////////////////////////////////////////////////////////
        //Exemplo simples
        //this.gui.add(this.scene, 'displayAxis').name('Display Axis');  
        //Exemplo slider
        // this.gui.add(this.scene, 'prismSlices', 3, 32).onChange(this.scene.updatePrismSlices.bind(this.scene)).step(1);
        //Exemplo de ligaçao a metodo
        //this.gui.add(this.scene, 'wrapS', this.scene.wrappingS).name('Wrap S').onChange(this.scene.updateTextureWrapping.bind(this.scene));
        //Exemple de pasta
        // var f0 = this.gui.addFolder('Top Left Coords')
        // f0.add(this.scene, 'displayAxis').name('Display Axis');
        // f0.add(this.scene.texCoords, '5', -5.0, 5.0, 0.1).name('T Coord').onChange(this.scene.updateTexCoords.bind(this.scene)).step(0.001);
        /////////////////////////////////////////////////////////////////////////////////////

        return true;
    }
}