const gravity = 0.6;

// const backPath = '../imagens/placeholder.png'

class Sprite {
    constructor({ position, velocity, dimensions, source }){
        this.position = position;
        this.velocity = velocity;
        this.width = dimensions.width;
        this.height = dimensions.height;

        if(source){
            this.image = new Image()
            this.image.src = source

            this.width = this.image.width
            this.height = this.image.height
        }
    }

    draw(){
        if(this.image){
            context.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )
        }else{
            context.fillStyle = 'white';
            context.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        

        if(this.isAttacking){
            context.fillStyle = 'red'
            context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    uptade(){
        if(Math.ceil(this.position.y+this.height) >= canvas.height){
            this.onGround = true
        }else{
            this.onGround = false
        }

        // this.velocity.y += gravity;

        if(this.position.y + this.height > canvas.height){
            this.position.y = canvas.height - this.height
            this.velocity.y = 0
        }else{
            if(!this.onGround){
                this.velocity.y += gravity
            } 
        }

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        this.attackBox.position.x = this.position.x
        this.attackBox.position.y = this.position.y

        this.draw()
    }

    attack(){
        if(this.onAttackCooldown) return

        this.isAttacking = true
        this.onAttackCooldown = true

        setTimeout(()=>{
            this.isAttacking = false
        }, 100)

        setTimeout(()=>{
            this.onAttackCooldown = false
        }, this.AttackCooldown)
    }

    jump(){
        if(!this.onGround) return
        this.velocity.y = -16
    }
}

class Fighter extends Sprite{
    constructor({
        position,
        velocity,
        dimensions
    }) {
        super({
            position,
            velocity,
            dimensions
        })
        this.velocity = velocity
        this.width = dimensions.width
        this.height = dimensions.height

        this.attackBox = {
            position:{
                x: this.position.x,
                y: this.position.y,
            },
            width: 125,
            height: 50
        }

        this.isAttacking
        this.AttackCooldown = 500
        this.onAttackCooldown

        this.lastKeyPressed
        this.onGround
    }
}

const player = new Fighter({
    position: {
        x: 100,
        y: 0
    },
    velocity:{
        x: 0,
        y: 10
    },
    dimensions:{
        width: 50,
        height: 150
    }
})

// const player2 = new Fighter({
//     position: {
//         x:300,
//         y: 20
//     },
//     velocity:{
//         x: 0,
//         y: 0
//     },
//     dimensions:{
//         width: 50,
//         height: 200
//     }
// })

const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    source: '../imagens/placeholder.png'
})