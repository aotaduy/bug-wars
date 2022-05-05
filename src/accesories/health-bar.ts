const BarHeight = 6;
const BorderWidth = 1
export class HealthBar {

    x;
    y;
    value;
    bar;
    target;
    constructor (scene, target)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.target = target
        this.value = 100;
        console.log(target)
        this.update();

        scene.add.existing(this.bar);
    }

     update() {
        this.x = this.target.x - this.target.width / 2;
        this.y = this.target.y - this.target.height / 2 - BarHeight * 2;
        this.draw();
    }

    setValue (amount)
    {
        this.value = amount > 100 ? 100 : amount < 0 ? 0 : amount

        this.draw();

    }

    draw ()
    {
        this.bar.clear();

        if (this.value === 100) {
            return
        }
        //  BG
        this.bar.fillStyle(0x000000);
        const width = this.target.width;
        this.bar.fillRect(this.x, this.y, width, BarHeight);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + BorderWidth, this.y + BorderWidth , width - BorderWidth * 2, BarHeight - BorderWidth);

        if (this.value < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }

        const d = Math.floor((width - BorderWidth * 2) * this.value / 100);

        this.bar.fillRect(this.x + BorderWidth, this.y + BorderWidth, d, BarHeight - BorderWidth);
    }

    destroy(fromScene: boolean) {
        this.bar.destroy(fromScene)
    }
}
