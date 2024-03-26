import { GlobalDataService } from "server/classes/GlobalDataStoreService";
import { ServerPlayerComponent } from "server/components/PlayerComponent";
import { PotionType } from "shared/enums/PotionEnum";
import { WorldsData } from "shared/info/WorldInfo";
import { EggBuyType } from "shared/interfaces/EggData";
import { Evolutions, Mutations, Sizes } from "shared/interfaces/PetData";

export const MarketCallbacks = new Map<string, (player: ServerPlayerComponent) => void>([])

MarketCallbacks.set('test', (player) => {
    print('Purchased!')
    player.OpenEggBypass('Donate', EggBuyType.Single)
    print(player.profile.Data)
})

MarketCallbacks.set('tinypackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(100*multi+profileData.Values.GemsVal)
})

MarketCallbacks.set('smallpackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(100*multi+profileData.Values.GemsVal)
})

MarketCallbacks.set('mediumpackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(100*multi+profileData.Values.GemsVal)
})

MarketCallbacks.set('largepackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(100*multi+profileData.Values.GemsVal)
})

MarketCallbacks.set('hugepackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(100*multi+profileData.Values.GemsVal)
})

MarketCallbacks.set('megapackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(100*multi+profileData.Values.GemsVal)
})

MarketCallbacks.set('megahugepackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(100*multi+profileData.Values.GemsVal)
})

MarketCallbacks.set('tinypackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(100*multi+profileData.Values.StrengthVal)
})

MarketCallbacks.set('smallpackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(100*multi+profileData.Values.StrengthVal)
})

MarketCallbacks.set('mediumpackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(100*multi+profileData.Values.StrengthVal)
})

MarketCallbacks.set('largepackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(100*multi+profileData.Values.StrengthVal)
})

MarketCallbacks.set('hugepackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(100*multi+profileData.Values.StrengthVal)
})

MarketCallbacks.set('megapackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(100*multi+profileData.Values.StrengthVal)
})

MarketCallbacks.set('megahugepackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(100*multi+profileData.Values.StrengthVal)
})

MarketCallbacks.set('tinypackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(100*multi+profileData.Values.WinsVal)
})

MarketCallbacks.set('smallpackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(100*multi+profileData.Values.WinsVal)
})

MarketCallbacks.set('mediumpackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(100*multi+profileData.Values.WinsVal)
})

MarketCallbacks.set('largepackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(100*multi+profileData.Values.WinsVal)
})

MarketCallbacks.set('hugepackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(100*multi+profileData.Values.WinsVal)
})

MarketCallbacks.set('megapackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(100*multi+profileData.Values.WinsVal)
})

MarketCallbacks.set('megahugepackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(100*multi+profileData.Values.WinsVal)
})

MarketCallbacks.set('100storage', (player) => {
    let profileData = player.profile.Data
    profileData.Config.MaxPets += 100
})

MarketCallbacks.set('250storage', (player) => {
    let profileData = player.profile.Data
    profileData.Config.MaxPets += 250
})

MarketCallbacks.set('3equipped', (player) => {
    let profileData = player.profile.Data
    profileData.Config.MaxEquippedPets += 3
})

MarketCallbacks.set('5equipped', (player) => {
    let profileData = player.profile.Data
    profileData.Config.MaxEquippedPets += 5
})

MarketCallbacks.set('doublegems', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.GemsMul += 1
})

MarketCallbacks.set('doublestars', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.StarsMul += 1
})

MarketCallbacks.set('instantpower', (player) => {
    //! алямантера
})

MarketCallbacks.set('fasthatch', (player) => {
    //! кокрочес
})

MarketCallbacks.set('3egghatch', (player) => {
    //! алямантера
})

MarketCallbacks.set('autorebirth', (player) => {
    //! алямантера
})

MarketCallbacks.set('doublewins', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.WinsMul += 1
})

MarketCallbacks.set('doubleaccuracy', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.StrengthMul += 1
})

MarketCallbacks.set('triplewins', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.WinsMul += 2
})

MarketCallbacks.set('vippass', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.StrengthMul += .5
    profileData.Multipliers.WinsMul += .5
})

MarketCallbacks.set('luck1', (player) => {
    let profileData = player.profile.Data
    profileData.Config.Luck += .5
})

MarketCallbacks.set('luck2', (player) => {
    let profileData = player.profile.Data
    profileData.Config.Luck += .5
    profileData.Products.push('luck2')
})

MarketCallbacks.set('luck3', (player) => {
    let profileData = player.profile.Data
    profileData.Config.Luck += .5
    MarketCallbacks.get('largepackwins')!(player)
    profileData.Products.push('luck3')
})

MarketCallbacks.set('rebirthskip1', (player) => {
    let profileData = player.profile.Data
    profileData.StatValues.RebirthSkips += 1
    if (profileData.StatValues.RebirthSkips !== 1) { return }
    player.DoRebirth(true)
    player.replica.SetValue('Profile.StatValues.RebirthSkips', profileData.StatValues.RebirthSkips)
})

MarketCallbacks.set('rebirthskip2', (player) => {
    let profileData = player.profile.Data
    profileData.StatValues.RebirthSkips += 1
    if (profileData.StatValues.RebirthSkips !== 2) { return }
    player.DoRebirth(true)
    player.replica.SetValue('Profile.StatValues.RebirthSkips', profileData.StatValues.RebirthSkips)
})

MarketCallbacks.set('rebirthskip3', (player) => {
    let profileData = player.profile.Data
    profileData.StatValues.RebirthSkips += 1
    if (profileData.StatValues.RebirthSkips !== 3) { return }
    player.DoRebirth(true)
    player.replica.SetValue('Profile.StatValues.RebirthSkips', profileData.StatValues.RebirthSkips)
})

MarketCallbacks.set('rebirthskip4', (player) => {
    let profileData = player.profile.Data
    profileData.StatValues.RebirthSkips += 1
    if (profileData.StatValues.RebirthSkips !== 4) { return }
    player.DoRebirth(true)
    player.replica.SetValue('Profile.StatValues.RebirthSkips', profileData.StatValues.RebirthSkips)
})

MarketCallbacks.set('rebirthskip5', (player) => {
    let profileData = player.profile.Data
    profileData.StatValues.RebirthSkips += 1
    player.DoRebirth(true)
    player.replica.SetValue('Profile.StatValues.RebirthSkips', profileData.StatValues.RebirthSkips)
})

MarketCallbacks.set('x2winspotion', (player) => {
    player.AppendPotion(PotionType.WinsPotion, 5)
})

MarketCallbacks.set('luckpotion', (player) => {
    player.AppendPotion(PotionType.LuckPotion, 5)
})

MarketCallbacks.set('goldpotion', (player) => {
    player.AppendPotion(PotionType.GoldPotion, 5)
})

MarketCallbacks.set('voidpotion', (player) => {
    player.AppendPotion(PotionType.VoidPotion, 5)
})

MarketCallbacks.set('allpotions', (player) => {
    player.AppendPotion(PotionType.WinsPotion, 10**5)
    player.AppendPotion(PotionType.LuckPotion, 10**5)
    player.AppendPotion(PotionType.GoldPotion, 10**5)
    player.AppendPotion(PotionType.VoidPotion, 10**5)
})

MarketCallbacks.set('bundle', (player) => {
    let profileData = player.profile.Data

    MarketCallbacks.get('fasthatch')!(player)
    MarketCallbacks.get('doublewins')!(player)
    MarketCallbacks.get('3equipped')!(player)

    profileData.Products.push('fasthatch')
    profileData.Products.push('doublewins')
    profileData.Products.push('3equipped')
    profileData.Products.push('bundle')
})

MarketCallbacks.set('spacepack', (player) => {
    let profileData = player.profile.Data

    profileData.Config.MaxEquippedPets += 2
    player.SetGems(profileData.Values.GemsVal + 100)
    player.SetWins(profileData.Values.WinsVal + 2.5*(10**6))
    player.OpenEggBypass('Nightmare', EggBuyType.Single)

    player.replica.SetValue('Profile.Config.MaxEquippedPets', profileData.Config.MaxEquippedPets)
    profileData.Products.push('spacepack')
})

MarketCallbacks.set('cavepack', (player) => {
    let profileData = player.profile.Data

    profileData.Config.MaxEquippedPets += 1
    player.SetWins(profileData.Values.WinsVal + 200)
    player.AppendTool('SlingshotD1W1')
    player.AppendPet({
        name: 'Soul Golem',
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    })

    player.replica.SetValue('Profile.Config.MaxEquippedPets', profileData.Config.MaxEquippedPets)
    profileData.Products.push('cavepack')
})

MarketCallbacks.set('neonpack', (player) => {
    let profileData = player.profile.Data

    profileData.Config.MaxEquippedPets += 1
    profileData.Config.MaxPets += 50
    player.AppendPotion(PotionType.WinsPotion, 1)
    player.OpenEggBypass('Party', EggBuyType.Single)

    player.replica.SetValue('Profile.Config.MaxEquippedPets', profileData.Config.MaxPets)
    player.replica.SetValue('Profile.Config.MaxEquippedPets', profileData.Config.MaxEquippedPets)
    profileData.Products.push('neonpack')
})

MarketCallbacks.set('starterpack', (player) => {
    let profileData = player.profile.Data

    profileData.Config.MaxEquippedPets += 1
    player.AppendPotion(PotionType.WinsPotion, 1)
    player.SetWins(profileData.Values.WinsVal + 300)

    player.replica.SetValue('Profile.Config.MaxEquippedPets', profileData.Config.MaxEquippedPets)
    profileData.Products.push('starterpack')
})

MarketCallbacks.set('buy1spin', (player) => {
    let profileData = player.profile.Data

    profileData.StatValues.SpinCount += 1
    player.replica.SetValue('Profile.StatValues.SpinCount', profileData.StatValues.SpinCount)
})

MarketCallbacks.set('buy10spin', (player) => {
    let profileData = player.profile.Data

    profileData.StatValues.SpinCount += 10
    player.replica.SetValue('Profile.StatValues.SpinCount', profileData.StatValues.SpinCount)
})

MarketCallbacks.set('buy100spin', (player) => {
    let profileData = player.profile.Data

    profileData.StatValues.SpinCount += 100
    player.replica.SetValue('Profile.StatValues.SpinCount', profileData.StatValues.SpinCount)
})

MarketCallbacks.set('limited1', (player) => {
    let profileData = player.profile.Data

    player.AppendPet({
        name: 'Soul Golem',
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    })

    GlobalDataService.setValue('Limited1', GlobalDataService.values.get('Limited1')!-1)
})

MarketCallbacks.set('limited2', (player) => {
    let profileData = player.profile.Data

    player.AppendPet({
        name: 'Soul Golem',
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    })

    GlobalDataService.setValue('Limited2', GlobalDataService.values.get('Limited2')!-1)
})

MarketCallbacks.set('limited3', (player) => {
    let profileData = player.profile.Data

    player.AppendPet({
        name: 'Soul Golem',
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    })

    GlobalDataService.setValue('Limited3', GlobalDataService.values.get('Limited3')!-1)
})

MarketCallbacks.set('unlocksessiongifts', (player) => {
    player.session.sessionTime = 10**6
    player.replica.SetValue('Session.sessionTime', player.session.sessionTime)
})