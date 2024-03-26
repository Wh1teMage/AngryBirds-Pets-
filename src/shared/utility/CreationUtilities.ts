const PrefixSymbols = new Map<number, string>([
    [ 10**3, 'K' ],
    [ 10**6, 'M' ],
    [ 10**9, 'B' ],
    [ 10**12, 'T' ],
    [ 10**15, 'Qa' ],
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

export class CreationUtilities {

    static SurfaceGui(parent: BasePart) {

        let surface = new Instance('SurfaceGui')
        surface.Parent = parent

        return surface

    }

    static Weld(p0: BasePart, p1: BasePart) {

        let weld = new Instance('WeldConstraint')
        weld.Part0 = p0
        weld.Part1 = p1
        weld.Parent = p0

        print(weld)

    }

    static getSIPrefixSymbol(num: number) {
        let strToReturn = tostring(math.round(num * 100)/100);

        if (math.abs(num) < 1000) { return strToReturn };

        PrefixSymbols.forEach((value, key) => {
            if (((num / key) >= 1) && ((num / key) <= 1000)) {
                strToReturn = (tostring(math.round(num / key * 100)/100) + value);
            } 
        });
        return strToReturn;
    }

}