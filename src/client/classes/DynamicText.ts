const activeDynamicText = new Map<TextButton | TextLabel, thread>()

const defaultInfo: StrokeInfo = {
    Speed: 10
}

export interface StrokeInfo {
    Speed: number
} 

export class DynamicText {

    public info?: Map<number, StrokeInfo>
    public text: string
    public object: TextButton | TextLabel

    private _getSelectedInfo(pointer: number) {
        let selectedInfo = { data: defaultInfo, current: 0, previous: 0 }
        let distance = 1000

        if (!this.info) { return selectedInfo }

        this.info.forEach((value, key) => {
            if ((pointer <= key) && ((key - pointer) > distance) ) { return }
            if (pointer <= key) { distance = key - pointer; selectedInfo.current = key; selectedInfo.data = value }
            selectedInfo.previous = key
        })

        return selectedInfo
    }

    constructor(obj: TextButton | TextLabel, text: string, info?: Map<number, StrokeInfo>) {
        this.object = obj
        this.text = text
        this.info = info
    }

    public Stop() {
        if (!activeDynamicText.get(this.object)) { return }
        coroutine.close(activeDynamicText.get(this.object)!)
    }

    
    public Start() {
        this.Stop()

        let coro = coroutine.create(() => {

            let formatted = string.gsub(this.text,"<[^<>]->", "")[0]

            this.object.MaxVisibleGraphemes = 0
            this.object.Text = this.text

            for (let i = 0; i <= formatted.size(); i++) {
                let info = this._getSelectedInfo(i)!
                this.object.MaxVisibleGraphemes = i
                task.wait(1/info.data.Speed)
            }
            
        })

        coroutine.resume(coro)
        activeDynamicText.set(this.object, coro)
    }

}


// const activeDynamicText = new Map<TextButton | TextLabel, thread>()

// const symbols = ['<t', '<r', '<n']

// interface Idata{
//     text:string
// }

// interface Iargs{
//     typingSpeed: number,   // скорость печатания
//     switchTimeout: number, // время ожидания перед переключением между элементами
//     element: TextButton | TextLabel
//     data: Idata[]
// }

// export class DynamicText {

//     constructor(obj: TextButton | TextLabel, text: string) {
//         if (activeDynamicText.get(obj)) {
//             coroutine.yield(activeDynamicText.get(obj))
//         }

//         let coro = coroutine.create(() => {

            // autotypingText( {
            //     typingSpeed: 50,       // скорость печатания
            //     switchTimeout: 2000,   // время ожидания перед переключением между элементами
            //     element: obj,
            //     data: [
            //         {
            //             text: 'гагага',
            //         }
            //     ],
            // } )

            // function autotypingText(args: Iargs){
            //     let itemCount:number = args.data.size();
            //     let curItemIndex = -1;
            //     let currentLength = 0;
            //     let theText = '';
            
            //     runTheTicker();
            
            //     function runTheTicker(){
            //         let theHold
            
            //         // Переход к следующему элементу
            //         if( currentLength === 0 ){
            //             curItemIndex++;
            //             curItemIndex = curItemIndex % itemCount;
            //             args.element.href = args.data[curItemIndex].url;
            //         }
            
            //         // Располагаем текущий текст в анкор с печатанием
            //         args.element.innerHTML = theText.substring( 0, currentLength ) + znak();
            
            //         // Преобразуем длину для подстроки и определяем таймер
            //         if( currentLength !== theText.length ){
            //             currentLength++;
            //             theHold = args.typingSpeed;
            //         }
            //         else{
            //             currentLength = 0;
            //             theHold = args.switchTimeout;
            //         }
            
            //         // Повторяем цикл с учетом задержки
            //         setTimeout( runTheTicker, theHold );
            //     }
            
            //     function znak(){
            //         return ( currentLength === theText.length ) ? '' : '|';
            //     }
            
            // }

//         })

//         activeDynamicText.set(obj, coro)
//         coroutine.resume(coro)

//         '<t=1>'
//     }

// }