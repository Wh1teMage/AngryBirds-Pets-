const PrefixSymbols = new Map<number, string>([
    [ 10**3, 'K' ],
    [ 10**6, 'M' ],
    [ 10**9, 'B' ],
    [ 10**12, 'T' ],
    [ 10**15, 'Qd' ],
    [ 10**18, 'Qn' ],
    [ 10**21, 'Sx' ],
    [ 10**24, 'Sp' ],
    [ 10**27, 'Oc' ],
    [ 10**30, 'N' ],
    [ 10**33, 'Dc' ],
    [ 10**36, 'UD' ],
    [ 10**39, 'DD' ],
    [ 10**42, 'TD' ],
    [ 10**45, 'QaD' ],
    [ 10**48, 'QnD' ],
    [ 10**51, 'SxD' ],
    [ 10**54, 'SpD' ],
    [ 10**57, 'OcD' ],
    [ 10**60, 'Nov' ],
    [ 10**63, 'Vg', ],
])


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

    static getSIPrefixSymbol(num: number) {
        let strToReturn = tostring(math.round(num * 100)/100);

        if (math.abs(num) < 1000) { return strToReturn };

        PrefixSymbols.forEach((value, key) => {
            if (((num / key) >= 1) && ((num / key) < 1000)) {
                strToReturn = (tostring(math.round(num / key * 100)/100) + value);
            } 
        });
        return strToReturn;
    }


    static GuiTimeFormatter(time: number) {
        function getTimeRemaining(){
            let rt = [`${math.floor( (time/(60*60)) % 24 )}`, `${math.floor( (time/60) % 60 )}`, `${math.floor( (time) % 60 )}`]
            if(rt[0].size() < 2){ rt[0] = '0' + rt[0]}
            if(rt[1].size() < 2){ rt[1] = '0' + rt[1]}
            if(rt[2].size() < 2){ rt[2] = '0' + rt[2]}

            return rt
        }
        let t = getTimeRemaining()
        return `${t[0]}:${t[1]}:${t[2]}`
    }
}