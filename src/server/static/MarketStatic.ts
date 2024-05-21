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
    player.SetGems(profileData.Values.GemsVal + 7)
    //profileData.StatValues.RobuxSpent += 39
})

MarketCallbacks.set('smallpackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(profileData.Values.GemsVal + 15)
    //profileData.StatValues.RobuxSpent += 69
})

MarketCallbacks.set('mediumpackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(profileData.Values.GemsVal + 45)
    //profileData.StatValues.RobuxSpent += 219
})

MarketCallbacks.set('largepackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(profileData.Values.GemsVal + 80)
    //profileData.StatValues.RobuxSpent += 359
})

MarketCallbacks.set('hugepackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(profileData.Values.GemsVal + 150)
    //profileData.StatValues.RobuxSpent += 559
})

MarketCallbacks.set('megapackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(profileData.Values.GemsVal + 250)
    //profileData.StatValues.RobuxSpent += 899
})

MarketCallbacks.set('megahugepackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(profileData.Values.GemsVal + 350)
    //profileData.StatValues.RobuxSpent += 1199
})

MarketCallbacks.set('tinypackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(profileData.Values.StrengthVal + math.max(1000, profileData.MaxValues.StrengthMaxVal*0.025))
    //profileData.StatValues.RobuxSpent += 39
})

MarketCallbacks.set('smallpackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(profileData.Values.StrengthVal + math.max(2000, profileData.MaxValues.StrengthMaxVal*0.065))
    //profileData.StatValues.RobuxSpent += 69
})

MarketCallbacks.set('mediumpackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(profileData.Values.StrengthVal + math.max(4000, profileData.MaxValues.StrengthMaxVal*0.225))
    //profileData.StatValues.RobuxSpent += 219
})

MarketCallbacks.set('largepackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(profileData.Values.StrengthVal + math.max(7500, profileData.MaxValues.StrengthMaxVal*0.445))
    //profileData.StatValues.RobuxSpent += 359
})

MarketCallbacks.set('hugepackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(profileData.Values.StrengthVal + math.max(15000, profileData.MaxValues.StrengthMaxVal*0.90))
    //profileData.StatValues.RobuxSpent += 559
})

MarketCallbacks.set('megapackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(profileData.Values.StrengthVal + math.max(27000, profileData.MaxValues.StrengthMaxVal*1.20))
    //profileData.StatValues.RobuxSpent += 899
})

MarketCallbacks.set('megahugepackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(profileData.Values.StrengthVal + math.max(40000, profileData.MaxValues.StrengthMaxVal*1.50))
    //profileData.StatValues.RobuxSpent += 1199
})

MarketCallbacks.set('tinypackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(profileData.Values.WinsVal + math.max(50, profileData.MaxValues.WinsMaxVal*0.05))
    //profileData.StatValues.RobuxSpent += 39
})

MarketCallbacks.set('smallpackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(profileData.Values.WinsVal + math.max(130, profileData.MaxValues.WinsMaxVal*0.13))
    //profileData.StatValues.RobuxSpent += 69
})

MarketCallbacks.set('mediumpackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(profileData.Values.WinsVal + math.max(450, profileData.MaxValues.WinsMaxVal*0.45))
    //profileData.StatValues.RobuxSpent += 219
})

MarketCallbacks.set('largepackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(profileData.Values.WinsVal + math.max(750, profileData.MaxValues.WinsMaxVal*0.89))
    //profileData.StatValues.RobuxSpent += 359
})

MarketCallbacks.set('hugepackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(profileData.Values.WinsVal + math.max(1450, profileData.MaxValues.WinsMaxVal*1.80))
    //profileData.StatValues.RobuxSpent += 559
})

MarketCallbacks.set('megapackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(profileData.Values.WinsVal + math.max(2000, profileData.MaxValues.WinsMaxVal*2.40))
    //profileData.StatValues.RobuxSpent += 899
})

MarketCallbacks.set('megahugepackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(profileData.Values.WinsVal + math.max(3000, profileData.MaxValues.WinsMaxVal*3.00))
    //profileData.StatValues.RobuxSpent += 1199
})

MarketCallbacks.set('100storage', (player) => {
    let profileData = player.profile.Data
    profileData.Config.MaxPets += 100
    player.replica.SetValue('Profile.Config.MaxPets', profileData.Config.MaxPets)
    //profileData.StatValues.RobuxSpent += 79
})

MarketCallbacks.set('250storage', (player) => {
    let profileData = player.profile.Data
    profileData.Config.MaxPets += 250
    player.replica.SetValue('Profile.Config.MaxPets', profileData.Config.MaxPets)
    //profileData.StatValues.RobuxSpent += 179
})

MarketCallbacks.set('3equipped', (player) => {
    let profileData = player.profile.Data
    profileData.Config.MaxEquippedPets += 3
    player.replica.SetValue('Profile.Config.MaxEquippedPets', profileData.Config.MaxEquippedPets)
    //profileData.StatValues.RobuxSpent += 249
})

MarketCallbacks.set('5equipped', (player) => {
    let profileData = player.profile.Data
    profileData.Config.MaxEquippedPets += 5
    player.replica.SetValue('Profile.Config.MaxEquippedPets', profileData.Config.MaxEquippedPets)
    //profileData.StatValues.RobuxSpent += 399
})

MarketCallbacks.set('doublegems', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.GemsMul += 1
    //profileData.StatValues.RobuxSpent += 349
})

MarketCallbacks.set('doublestars', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.StarsMul += 1
    //profileData.StatValues.RobuxSpent += 449
})

MarketCallbacks.set('instantpower', (player) => {
    let profileData = player.profile.Data
    //profileData.StatValues.RobuxSpent += 799
})

MarketCallbacks.set('fasthatch', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.HatchSpeedMul += .5
    //profileData.StatValues.RobuxSpent += 129
})

MarketCallbacks.set('3egghatch', (player) => {
    let profileData = player.profile.Data
    //profileData.StatValues.RobuxSpent += 379
})

MarketCallbacks.set('autorebirth', (player) => {
    let profileData = player.profile.Data
    //profileData.StatValues.RobuxSpent += 129
})

MarketCallbacks.set('doublewins', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.WinsMul += 1
    //profileData.StatValues.RobuxSpent += 349
})

MarketCallbacks.set('doubleaccuracy', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.StrengthMul += 1
    //profileData.StatValues.RobuxSpent += 249
})

MarketCallbacks.set('triplewins', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.WinsMul += 2
    //profileData.StatValues.RobuxSpent += 649
})

MarketCallbacks.set('vippass', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.StrengthMul += .5
    profileData.Multipliers.WinsMul += .5
    //profileData.StatValues.RobuxSpent += 449
})

MarketCallbacks.set('luck1', (player) => {
    let profileData = player.profile.Data
    profileData.Config.Luck += .5
    //profileData.StatValues.RobuxSpent += 99
    profileData.Products.push('luck1')
})

MarketCallbacks.set('luck2', (player) => {
    let profileData = player.profile.Data
    profileData.Config.Luck += .5
    //profileData.StatValues.RobuxSpent += 649
    profileData.Products.push('luck2')
})

MarketCallbacks.set('luck3', (player) => {
    let profileData = player.profile.Data
    profileData.Config.Luck += .5
    MarketCallbacks.get('largepackwins')!(player)
    //profileData.StatValues.RobuxSpent += 1199
    profileData.Products.push('luck3')
})

MarketCallbacks.set('rebirthskip1', (player) => {
    let profileData = player.profile.Data
    profileData.StatValues.RebirthSkips += 1
    if (profileData.StatValues.RebirthSkips !== 1) { return }
    player.DoRebirth(true)
    player.replica.SetValue('Profile.StatValues.RebirthSkips', profileData.StatValues.RebirthSkips)
    //profileData.StatValues.RobuxSpent += 99
})

MarketCallbacks.set('rebirthskip2', (player) => {
    let profileData = player.profile.Data
    profileData.StatValues.RebirthSkips += 1
    if (profileData.StatValues.RebirthSkips !== 2) { return }
    player.DoRebirth(true)
    player.replica.SetValue('Profile.StatValues.RebirthSkips', profileData.StatValues.RebirthSkips)
    //profileData.StatValues.RobuxSpent += 149
})

MarketCallbacks.set('rebirthskip3', (player) => {
    let profileData = player.profile.Data
    profileData.StatValues.RebirthSkips += 1
    if (profileData.StatValues.RebirthSkips !== 3) { return }
    player.DoRebirth(true)
    player.replica.SetValue('Profile.StatValues.RebirthSkips', profileData.StatValues.RebirthSkips)
    //profileData.StatValues.RobuxSpent += 249
})

MarketCallbacks.set('rebirthskip4', (player) => {
    let profileData = player.profile.Data
    profileData.StatValues.RebirthSkips += 1
    if (profileData.StatValues.RebirthSkips !== 4) { return }
    player.DoRebirth(true)
    player.replica.SetValue('Profile.StatValues.RebirthSkips', profileData.StatValues.RebirthSkips)
    //profileData.StatValues.RobuxSpent += 349
})

MarketCallbacks.set('rebirthskip5', (player) => {
    let profileData = player.profile.Data
    profileData.StatValues.RebirthSkips += 1
    player.DoRebirth(true)
    player.replica.SetValue('Profile.StatValues.RebirthSkips', profileData.StatValues.RebirthSkips)
    //profileData.StatValues.RobuxSpent += 499
})

MarketCallbacks.set('x2winspotion', (player) => {
    let profileData = player.profile.Data
    player.AppendPotion(PotionType.WinsPotion, 5)
    //profileData.StatValues.RobuxSpent += 109
})

MarketCallbacks.set('luckpotion', (player) => {
    let profileData = player.profile.Data
    player.AppendPotion(PotionType.LuckPotion, 5)
    //profileData.StatValues.RobuxSpent += 59
})

MarketCallbacks.set('goldpotion', (player) => {
    let profileData = player.profile.Data
    player.AppendPotion(PotionType.GoldPotion, 5)
    //profileData.StatValues.RobuxSpent += 129
})

MarketCallbacks.set('voidpotion', (player) => {
    let profileData = player.profile.Data
    player.AppendPotion(PotionType.VoidPotion, 5)
    //profileData.StatValues.RobuxSpent += 169
})

MarketCallbacks.set('allpotions', (player) => {
    let profileData = player.profile.Data
    player.AppendPotion(PotionType.WinsPotion, 10**5)
    player.AppendPotion(PotionType.LuckPotion, 10**5)
    player.AppendPotion(PotionType.GoldPotion, 10**5)
    player.AppendPotion(PotionType.VoidPotion, 10**5)
    //profileData.StatValues.RobuxSpent += 1799
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

    //profileData.StatValues.RobuxSpent += 499
})

MarketCallbacks.set('spacepack', (player) => {
    let profileData = player.profile.Data

    profileData.Config.MaxEquippedPets += 2
    player.SetGems(profileData.Values.GemsVal + 100)
    player.SetWins(profileData.Values.WinsVal + 2.5*(10**6))
    player.OpenEggBypass('Nightmare', EggBuyType.Single)

    player.replica.SetValue('Profile.Config.MaxEquippedPets', profileData.Config.MaxEquippedPets)
    profileData.Products.push('spacepack')

    //profileData.StatValues.RobuxSpent += 449
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

    //profileData.StatValues.RobuxSpent += 149
})

MarketCallbacks.set('neonpack', (player) => {
    let profileData = player.profile.Data

    profileData.Config.MaxEquippedPets += 1
    profileData.Config.MaxPets += 50
    player.AppendPotion(PotionType.WinsPotion, 1)
    player.OpenEggBypass('Party', EggBuyType.Single)

    player.replica.SetValue('Profile.Config.MaxPets', profileData.Config.MaxPets)
    player.replica.SetValue('Profile.Config.MaxEquippedPets', profileData.Config.MaxEquippedPets)
    profileData.Products.push('neonpack')

    //profileData.StatValues.RobuxSpent += 149
})

MarketCallbacks.set('starterpack', (player) => {
    let profileData = player.profile.Data

    profileData.Config.MaxEquippedPets += 1
    player.AppendPotion(PotionType.WinsPotion, 1)
    player.SetWins(profileData.Values.WinsVal + 300)

    player.AppendPet({
        name: 'Magma Doggy',
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    })

    player.replica.SetValue('Profile.Config.MaxEquippedPets', profileData.Config.MaxEquippedPets)
    profileData.Products.push('starterpack')

    //profileData.StatValues.RobuxSpent += 99
})

MarketCallbacks.set('buy1spin', (player) => {
    let profileData = player.profile.Data

    profileData.StatValues.SpinCount += 1
    player.replica.SetValue('Profile.StatValues.SpinCount', profileData.StatValues.SpinCount)
    //profileData.StatValues.RobuxSpent += 49
})

MarketCallbacks.set('buy10spin', (player) => {
    let profileData = player.profile.Data

    profileData.StatValues.SpinCount += 10
    player.replica.SetValue('Profile.StatValues.SpinCount', profileData.StatValues.SpinCount)
    //profileData.StatValues.RobuxSpent += 399
})

MarketCallbacks.set('buy100spin', (player) => {
    let profileData = player.profile.Data

    profileData.StatValues.SpinCount += 100
    player.replica.SetValue('Profile.StatValues.SpinCount', profileData.StatValues.SpinCount)
    //profileData.StatValues.RobuxSpent += 2299
})

MarketCallbacks.set('limited1', (player) => {
    let profileData = player.profile.Data

    player.AppendPet({
        name: 'Ultra Capybara',
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    })

    GlobalDataService.setValue('Limited1', GlobalDataService.values.get('Limited1')!-1)
    //profileData.StatValues.RobuxSpent += 649
})

MarketCallbacks.set('limited2', (player) => {
    let profileData = player.profile.Data

    player.AppendPet({
        name: 'Psycho',
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    })

    GlobalDataService.setValue('Limited2', GlobalDataService.values.get('Limited2')!-1)
    //profileData.StatValues.RobuxSpent += 1549
})

MarketCallbacks.set('limited3', (player) => {
    let profileData = player.profile.Data

    player.AppendPet({
        name: 'Devils Soul',
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    })

    GlobalDataService.setValue('Limited3', GlobalDataService.values.get('Limited3')!-1)
    //profileData.StatValues.RobuxSpent += 9999
})

MarketCallbacks.set('unlocksessiongifts', (player) => {
    let profileData = player.profile.Data
    player.session.sessionTime = 10**6
    player.replica.SetValue('Session.sessionTime', player.session.sessionTime)
    //profileData.StatValues.RobuxSpent += 499
})


MarketCallbacks.set('nightmare1', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Nightmare', EggBuyType.Single)
    //profileData.StatValues.RobuxSpent += 400
})

MarketCallbacks.set('nightmare3', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Nightmare', EggBuyType.Triple)
    //profileData.StatValues.RobuxSpent += 1200
})

MarketCallbacks.set('nightmare10', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Nightmare', EggBuyType.Ten)
    //profileData.StatValues.RobuxSpent += 3200
})


MarketCallbacks.set('shadow1', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('ShadowDonate', EggBuyType.Single)
    //profileData.StatValues.RobuxSpent += 99
})

MarketCallbacks.set('shadow3', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('ShadowDonate', EggBuyType.Triple)
    //profileData.StatValues.RobuxSpent += 249
})

MarketCallbacks.set('shadow10', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('ShadowDonate', EggBuyType.Ten)
    //profileData.StatValues.RobuxSpent += 499
})


MarketCallbacks.set('party1', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Party', EggBuyType.Single)
    //profileData.StatValues.RobuxSpent += 150
})

MarketCallbacks.set('party3', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Party', EggBuyType.Triple)
    //profileData.StatValues.RobuxSpent += 450
})

MarketCallbacks.set('party10', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Party', EggBuyType.Ten)
    //profileData.StatValues.RobuxSpent += 1200
})

MarketCallbacks.set('diamond1', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Diamond', EggBuyType.Single)
    //profileData.StatValues.RobuxSpent += 149
})

MarketCallbacks.set('diamond3', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Diamond', EggBuyType.Triple)
    //profileData.StatValues.RobuxSpent += 439
})

MarketCallbacks.set('luminousstone', (player) => {
    let profileData = player.profile.Data
    player.AppendTool('SlingshotD1W1')
    //profileData.StatValues.RobuxSpent += 99
})

MarketCallbacks.set('strongshield', (player) => {
    let profileData = player.profile.Data
    player.AppendTool('SlingshotD1W2')
    //profileData.StatValues.RobuxSpent += 249
})

MarketCallbacks.set('lightsaber', (player) => {
    let profileData = player.profile.Data
    player.AppendTool('SlingshotD1W3')
    //profileData.StatValues.RobuxSpent += 449
})

MarketCallbacks.set('voidskip', (player) => {
    let profileData = player.profile.Data
    player.ClaimVoidPet(player.session.selectedVoid!, true)
    //profileData.StatValues.RobuxSpent += 199
})