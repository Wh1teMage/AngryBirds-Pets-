export class GUIUtilities {

    static InitializeGuiWheel(obj: GuiObject, speed: number, angel: number) {
        task.spawn(() => {
            obj.Rotation = -angel
            while (true) {
                for (let index = 0; index <= (angel/(speed/100))*2; index++) {
                    obj.Rotation += speed / 100
                    task.wait(1/1000)
                }

                for (let index = (angel/(speed/100))*2; index >= 0; index--) {
                    obj.Rotation -= speed / 100
                    task.wait(1/1000)
                }
            }
        })
    }

    static InitializeGuiTimer(TimerObj: TextLabel, time: number) {
        let EndTime = (os.time() + time)
        function getTimeRemaining(){
            let timeLeft = EndTime - os.time()
            return [math.floor( timeLeft/(60*60*24) ), math.floor( (timeLeft/(60*60)) % 24 ), math.floor( (timeLeft/60) % 60 ), math.floor( (timeLeft) % 60 )]
        }

        task.spawn(() => {
            for (let index = 0; index < time; index++) {
                let t = getTimeRemaining()
                TimerObj.Text = `${t[0]} ${t[1]}:${t[2]}:${t[3]}`
                task.wait(1)
            }
            TimerObj.Text = `End`
        })
    }
}