export default class MainScene extends Phaser.Scene {
  platforms!: Phaser.Physics.Arcade.StaticGroup
  stars!: Phaser.Physics.Arcade.Group
  bombs!: Phaser.Physics.Arcade.Group
  player!: Phaser.Physics.Arcade.Sprite
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  scoreUI!: Phaser.GameObjects.Text

  score = 0
  scoreText = `Score: ${this.score}`
  gameOver = false

  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {}

  create() {
    this.add.image(400, 300, 'sky')

    this.createPlatforms()
    this.createStars()
    this.createBombs()
    this.createPlayer()
    this.createUI()

    // collisions
    this.createCollisions()

    // cursors
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    if (this.cursors.left.isDown) {
      this.moveLeft()
    } else if (this.cursors.right.isDown) {
      this.moveRight()
    } else {
      this.moveIdle()
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.moveUp()
    }
  }

  // ---

  private createPlatforms() {
    this.platforms = this.physics.add.staticGroup()

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()

    this.platforms.create(600, 400, 'ground')
    this.platforms.create(50, 250, 'ground')
    this.platforms.create(750, 220, 'ground')
  }

  private createStars() {
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: {
        x: 12,
        y: 0,
        stepX: 70,
      },
    })

    this.stars.children.iterate(function (star) {
      star.setBounceY(Phaser.Math.FloatBetween(0.3, 0.5))
    })
  }

  private createBombs() {
    this.bombs = this.physics.add.group()
  }

  private createBomb() {
    let x = Phaser.Math.Between(0, 400)

    if (this.player.x < 400) {
      x = Phaser.Math.Between(400, 800)
    }

    const bomb = this.bombs.create(x, 0, 'bomb')
    bomb.setBounce(1)
    bomb.setCollideWorldBounds(true)
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
  }

  private createPlayer() {
    // Create the player
    this.player = this.physics.add.sprite(100, 300, 'character')

    // Have it collide with the world (the frame of the game)
    this.player.setCollideWorldBounds(true)

    // bounce when collide the world
    this.player.setBounce(0.2)

    this.player.setScale(1)

    // Create animations

    // Player moving left
    this.anims.create({
      key: 'player-left',
      frames: this.anims.generateFrameNumbers('character', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'player-right',
      frames: this.anims.generateFrameNumbers('character', {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'player-idle',
      frames: this.anims.generateFrameNumbers('character', {
        start: 4,
        end: 4,
      }),
    })
  }

  private createUI() {
    this.scoreUI = this.add.text(16, 16, this.scoreText, {
      fontSize: '32px',
      color: '#FFF',
    })
  }

  private moveLeft() {
    this.player.setVelocityX(-160)
    this.player.anims.play('player-left', true)
  }

  private moveRight() {
    this.player.setVelocityX(160)
    this.player.anims.play('player-right', true)
  }

  private moveIdle() {
    this.player.setVelocityX(0)
    this.player.anims.play('player-idle', true)
  }

  private moveUp() {
    this.player.setVelocityY(-330)
  }

  private createCollisions() {
    // player and platform
    this.physics.add.collider(this.player, this.platforms)

    // stars and platform
    this.physics.add.collider(this.stars, this.platforms)

    // bombs and platform
    this.physics.add.collider(this.bombs, this.platforms)

    this.physics.add.collider(this.bombs, this.bombs)

    // player and stars
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStars,
      null,
      this
    )

    // player and bombs
    this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this)
  }

  private collectStars(
    _player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    star: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  ) {
    // update the score
    this.updateScore()

    // destroy the overlapped star
    star.disableBody(true, true)

    // Check if we've collected all the stars. If so, renable the stars, add some bombs

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (star) {
        star.enableBody(true, star.x, 0, true, true)
      })

      this.createBomb()
    }
  }

  private hitBomb(
    _player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    _bomb: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  ) {
    // Pause the game
    this.physics.pause()

    // make the player red
    this.player.setTint(0xff0000)

    // set animation to idle
    this.player.anims.play('player-idle')

    // trigger game over by setting gameOver to true
    this.gameOver = true
  }

  private updateScore() {
    this.score += 10
    this.scoreText = `Score: ${this.score}`
    this.scoreUI.setText(this.scoreText)
  }
}
