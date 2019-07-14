/**
 * MyLSPlant
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSPlant extends MyLSystem
{
	constructor(scene)
	{
		super(scene);

		this.baseAxiom = "X";

		this.axiom = "X";
        this.ruleF = "FF";
        this.ruleX = "F[-X][X]F[-X]+X";
        this.ruleX2 = "F[-X][x]+X";
        this.ruleX3 = "F[+X]-X";
        this.ruleX4 = "F[/X][X]F[\\X]+X";
        this.ruleX5 = "F[\X][X]/X";
        this.ruleX6 = "F[/X]\X";
        this.ruleX7 = "F[^X][X]F[&X]^X";
        this.ruleX8 = "F[^X]&X";
        this.ruleX9 = "F[&X]^X";
		
		this.angle = 30;
        this.iterations = 4;
        this.scaleFactor = 0.5;

        // this.productions = {
		// 	"F": [ this.ruleF ],
		// 	"X": [  this.ruleX, this.ruleX2, this.ruleX3,
		// 			this.ruleX4, this.ruleX5, this.ruleX6,
		// 			this.ruleX7, this.ruleX8, this.ruleX9
		// 		]
		// }

		this.generate(
			this.baseAxiom,
			{
				"F": [ this.ruleF ],
				"X": [  this.ruleX, this.ruleX2, this.ruleX3,
						this.ruleX4, this.ruleX5, this.ruleX6,
						this.ruleX7, this.ruleX8, this.ruleX9
					]
			},
			this.angle,
			this.iterations,
			this.scaleFactor
		);

		this.iterate();
	}
		

	initGrammar()
	{
		this.grammar = {
			"F": new MyBranch(this.scene, 3),
			"X": new MyLeaf(this.scene)
		};
	};		
}