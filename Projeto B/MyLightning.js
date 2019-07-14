/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem
{
	constructor(scene)
	{
        super(scene);

        this.scene = scene;
        
        this.axiom = "X";
        this.rule1 = "F[-X][X]F[-X]+FX";
        this.rule2 = "-F[+FX][+FX][-F+X-F]";
        this.rule3 = "+F[-F+X][-FX][+F--F]";

        // cria as producoes
        this.productions= {
            "F": ["FF"],
            "X": [this.rule1, this.rule2, this.rule3]
        };

        // angulo de rotacao
        this.angle = MyScene.degToRad(25);

        // numero de iteracoes
        this.iterations = 3;

        // escalamento dos elementos dependente do numero de iteracoes
        this.scale = 0.5;

        this.depth = 0;
        this.startingTime = 0;
        this.running = false;
	}
		

	initGrammar()
	{
		this.grammar = {
			"F": new MyQuad(this.scene),
			"X": new MyQuad(this.scene)
		};
    };

    startAnimation(t) {
        this.axiom = "X";
        this.depth = 0;
        this.startingTime = t;
        this.running = true;
        this.iterate();
    }

    update(t) {
        if(this.running)
        {
            var elapsed = (t - this.startingTime)/1000;
            this.depth = Math.min(Math.round(elapsed * this.axiom.length), this.axiom.length);
            //console.log(this.depth);

            if(elapsed >= 1)
            {
                this.running = false;
                this.depth = 0;
            }
        }
    }
    
    display(){

        if(!this.running)
            return;

        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        var i;

        // percorre a cadeia de caracteres
        for (i = 0; i < this.depth; ++i){

            // verifica se sao caracteres especiais
            switch(this.axiom[i]){
                case "+":
                    // rotação em sentido positivo sobre o eixo dos ZZ;
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // rotação em sentido negativo sobre o eixo dos ZZ;
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "[":
                    // push
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    this.scene.popMatrix();
                    break;

                case "\\":
                    // rotação em sentido positivo sobre o eixo dos XX;
                    this.scene.rotate(this.angle, 1, 0, 0);
                    break;

                case "/":
                    // rotação em sentido negativo sobre o eixo dos XX;
                    this.scene.rotate(-this.angle, 1, 0, 0);
                    break;
                
                case "^":
                    // rotação em sentido positivo sobre o eixo dos YY;
                    this.scene.rotate(this.angle, 0, 1, 0);
                    break;

                case "&":
                    // rotação em sentido negativo sobre o eixo dos YY;
                    this.scene.rotate(-this.angle, 0, 1, 0);
                    break;

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive=this.grammar[this.axiom[i]];

                    if ( primitive )
                    {
                        this.scene.pushMatrix();
                        this.scene.scale(0.2, 1, 1);
                        this.scene.translate(0, -0.5, 0);
                        primitive.display();
                        this.scene.popMatrix();

                        this.scene.translate(0, -1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }
		
}