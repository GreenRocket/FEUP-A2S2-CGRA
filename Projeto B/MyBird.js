/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBird extends CGFobject
{
    constructor(scene, pos)
    {
        super(scene);

        this.startingPos = pos;

        
        this.currPos = Array.from(this.startingPos);
        this.vel = 0;
        this.accel = 0;
        this.heading = MyScene.degToRad(45);
        

        this.maxSpeed = 5;
        this.accelRate = 20;
        this.turnRate = 360;
        this.turnRateRad = MyScene.degToRad(this.turnRate);
        this.scaleFactor = 1;

        this.baseHeight = this.currPos[1];

        this.timer = 0;
        this.dt = 0;

        this.isDiving = false;
        this.diveStartTime = 0;
        this.diveOffset = 0;
        this.diveElapsedTime = 0;
        this.diveTryCatch = false;

        this.isCarryingBranch = false;
        this.branch = null;

        this.init();
    }
    
    init()
    {
        this.birdBody = new MyBirdBody(this.scene, this);
    }

    setTurnRate(deg) {
        this.turnRate = deg;
        this.turnRateRad = MyScene.degToRad(this.turnRate);
    }

    update(dt) {

        this.dt = dt;
        this.birdBody.update(dt);
        
        this.timer += dt;
        
        var x = Math.cos(this.heading);
        var z = -Math.sin(this.heading);
        this.vel += this.accelRate * this.accel * dt;
        this.vel = Math.min(this.vel, this.maxSpeed);
        this.vel = Math.max(this.vel, -this.maxSpeed);
        
        if(this.accel == 0)
            this.vel *= (0.9);
        
        this.currPos[0] += x * this.vel * dt;
        this.currPos[2] += z * this.vel * dt;
        
        this.accel = 0;

        //console.log(this.branch);


        this.keepWithinBound();

        if(this.isDiving)
        {
            //console.log(this.diveElapsedTime);

            this.diveElapsedTime += dt;
            
            
            // ir a zero - 1 sec
            if(this.diveElapsedTime <= 1)
            {
                this.diveOffset = this.diveElapsedTime * this.baseHeight;
            }

            
            // voltar a base height - 1 sec
            else if(this.diveElapsedTime <= 2)
            {
                this.diveOffset = (2 - this.diveElapsedTime) * this.baseHeight;

                if(!this.diveTryCatch)
                {
                    this.diveTryCatch = true;
                    this.tryAction();
                }
            }

            else if(this.diveElapsedTime > 2)
                this.isDiving = false;

        }
    }

    accelerate(v) {
        this.accel = v;
    }

    turn(v) {
        this.heading += v*this.turnRateRad * this.dt;
    }

    reset() {
        console.log(this.currPos);
        console.log(this.startingPos);
        this.accel = 0;
        this.vel = 0;
        this.heading = 0;
        this.currPos = Array.from(this.startingPos);
    }

    startDive() {

        if(this.isDiving)
            return;

        this.isDiving = true;
        this.diveTryCatch = false;
        this.diveElapsedTime = 0;
    }

    tryAction() {

        if(this.isCarryingBranch)
        {
            if(this.checkDistanceTo(this.scene.nest.pos) < 1.0)
            {
                this.isCarryingBranch = false;
                this.branch.isWithBird = false;
                this.scene.nest.addBranch(this.branch);
                this.branch = null;
                return;
            }
        }
        else
        {
            for (let i = 0; i < this.scene.branchArray.length; i++)
            {
                if(this.checkDistanceTo(this.scene.branchArray[i].pos) < 1.0)
                {
                    this.branch = this.scene.branchArray[i];
                    this.scene.branchArray.splice(i, 1);
                    this.isCarryingBranch = true;
                    this.branch.isWithBird = true;
                    return;
                }
            }

        }

    }

    keepWithinBound() {

        if(this.currPos[0] <= -10)
            this.currPos[0] = -10;
        else if (this.currPos[0] >= 10)
            this.currPos[0] = 10;

        if(this.currPos[2] >= 10)
                this.currPos[2] = 10;
        else if (this.currPos[2] <= -10)
        {
            this.currPos[1] = (this.baseHeight+1) * (this.currPos[2] - (-10))/(-13 - (-10)) + this.baseHeight;

            if (this.currPos[2] <= -13)
                this.currPos[2] = -13;

        }
    }

    checkDistanceTo(other) {
        var vec = [ other[0] - this.currPos[0],
                    other[2] - this.currPos[2]];

        var sqrDst = vec[0]*vec[0] + vec[1]*vec[1];

        return Math.sqrt(sqrDst);
    }
    
    display()
    {
        
        this.scene.pushMatrix();
        this.scene.translate(this.currPos[0], this.currPos[1] + (this.isDiving ? -this.diveOffset : 0), this.currPos[2]);
        this.scene.rotate(this.heading, 0, 1, 0);
        this.birdBody.display();
        if(this.branch != null)
        {
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.scene.translate(0.75, -0.35+this.birdBody.oscillationOffset/2, 0);
            this.branch.display();
        }
        this.scene.popMatrix();
    }
}