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
	}
		

	initGrammar()
	{
		this.grammar = {
			"F": new MyBranch(this.scene, 3),
			"X": new MyLeaf(this.scene)
		};
	};
		
}