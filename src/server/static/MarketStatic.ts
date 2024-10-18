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
    //player.SetGems(profileData.Values.GemsVal + 250)
    //profileData.StatValues.RobuxSpent += 39
})

MarketCallbacks.set('smallpackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    //player.SetGems(profileData.Values.GemsVal + 1000)
    //profileData.StatValues.RobuxSpent += 69
})

MarketCallbacks.set('mediumpackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    //player.SetGems(profileData.Values.GemsVal + 2500)
    //profileData.StatValues.RobuxSpent += 219
})

MarketCallbacks.set('largepackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    //player.SetGems(profileData.Values.GemsVal + 6500)
    //profileData.StatValues.RobuxSpent += 359
})

MarketCallbacks.set('hugepackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    //player.SetGems(profileData.Values.GemsVal + 15000)
    //profileData.StatValues.RobuxSpent += 559
})

MarketCallbacks.set('megapackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    //player.SetGems(profileData.Values.GemsVal + 30000)
    //profileData.StatValues.RobuxSpent += 899
})

MarketCallbacks.set('megahugepackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    //player.SetGems(profileData.Values.GemsVal + 50000)
    //profileData.StatValues.RobuxSpent += 1199
})

MarketCallbacks.set('tinypackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(profileData.Values.StrengthVal + 1000)
    //profileData.StatValues.RobuxSpent += 39
})

MarketCallbacks.set('smallpackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(profileData.Values.StrengthVal + 100000)
    //profileData.StatValues.RobuxSpent += 69
})

MarketCallbacks.set('mediumpackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(profileData.Values.StrengthVal + 1000000)
    //profileData.StatValues.RobuxSpent += 219
})

MarketCallbacks.set('largepackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(profileData.Values.StrengthVal + 100000000)
    //profileData.StatValues.RobuxSpent += 359
})

MarketCallbacks.set('hugepackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(profileData.Values.StrengthVal + 1000000000)
    //profileData.StatValues.RobuxSpent += 559
})

MarketCallbacks.set('megapackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(profileData.Values.StrengthVal + 500000000000)
    //profileData.StatValues.RobuxSpent += 899
})

MarketCallbacks.set('megahugepackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(profileData.Values.StrengthVal + 1000000000000)
    //profileData.StatValues.RobuxSpent += 1199
})

MarketCallbacks.set('100storage', (player) => {
    let profileData = player.profile.Data
    profileData.Config.MaxPets += 100
    player.replica.SetValue('Profile.Config.MaxPets', profileData.Config.MaxPets)
    //profileData.StatValues.RobuxSpent += 79
})

MarketCallbacks.set('50storage', (player) => {
    let profileData = player.profile.Data
    profileData.Config.MaxPets += 50
    player.replica.SetValue('Profile.Config.MaxPets', profileData.Config.MaxPets)
    //profileData.StatValues.RobuxSpent += 179
})

MarketCallbacks.set('2equipped', (player) => {
    let profileData = player.profile.Data
    profileData.Config.MaxEquippedPets += 2
    player.replica.SetValue('Profile.Config.MaxEquippedPets', profileData.Config.MaxEquippedPets)
    //profileData.StatValues.RobuxSpent += 249
})

MarketCallbacks.set('doublegems', (player) => {
    let profileData = player.profile.Data
    //profileData.Multipliers.GemsMul += 1
    //profileData.StatValues.RobuxSpent += 349
})

MarketCallbacks.set('fastswing', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.AttackSpeedMul += 4
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

MarketCallbacks.set('doubleaccuracy', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.StrengthMul += 1
    //profileData.StatValues.RobuxSpent += 249
})

MarketCallbacks.set('x2strengthpotion', (player) => {
    let profileData = player.profile.Data
    player.AppendPotion(PotionType.StrengthPotion2, 1)
    //profileData.StatValues.RobuxSpent += 109
})

MarketCallbacks.set('x3strengthpotion', (player) => {
    let profileData = player.profile.Data
    player.AppendPotion(PotionType.StrengthPotion3, 1)
    //profileData.StatValues.RobuxSpent += 59
})

MarketCallbacks.set('x2gemspotion', (player) => {
    let profileData = player.profile.Data
    player.AppendPotion(PotionType.GemsPotion2, 1)
    //profileData.StatValues.RobuxSpent += 129
})

MarketCallbacks.set('x3gemspotion', (player) => {
    let profileData = player.profile.Data
    player.AppendPotion(PotionType.GemsPotion3, 1)
    //profileData.StatValues.RobuxSpent += 169
})

MarketCallbacks.set('allpotions', (player) => {
    let profileData = player.profile.Data
    player.AppendPotion(PotionType.StrengthPotion2, 10**5)
    player.AppendPotion(PotionType.StrengthPotion3, 10**5)
    player.AppendPotion(PotionType.GemsPotion2, 10**5)
    player.AppendPotion(PotionType.GemsPotion3, 10**5)
    //profileData.StatValues.RobuxSpent += 1799
})

MarketCallbacks.set('bundle', (player) => {
    let profileData = player.profile.Data

    MarketCallbacks.get('100storage')!(player)
    MarketCallbacks.get('doubleaccuracy')!(player)
    MarketCallbacks.get('mediumpackgems')!(player)

    profileData.Products.push('100storage')
    profileData.Products.push('doubleaccuracy')
    profileData.Products.push('bundle')

    //profileData.StatValues.RobuxSpent += 499
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

MarketCallbacks.set('buy50spin', (player) => {
    let profileData = player.profile.Data

    profileData.StatValues.SpinCount += 50
    player.replica.SetValue('Profile.StatValues.SpinCount', profileData.StatValues.SpinCount)
    //profileData.StatValues.RobuxSpent += 2299
})

MarketCallbacks.set('buy100spin', (player) => {
    let profileData = player.profile.Data

    profileData.StatValues.SpinCount += 100
    player.replica.SetValue('Profile.StatValues.SpinCount', profileData.StatValues.SpinCount)
    //profileData.StatValues.RobuxSpent += 2299
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

MarketCallbacks.set('wingslightsaber', (player) => {
    let profileData = player.profile.Data
    player.AppendTool('Wings Lightsaber')
    profileData.Products.push('wingslightsaber')
    //profileData.StatValues.RobuxSpent += 1200
})

MarketCallbacks.set('doublelightsaber', (player) => {
    let profileData = player.profile.Data
    player.AppendTool('Double Lightsaber')
    profileData.Products.push('doublelightsaber')
    //profileData.StatValues.RobuxSpent += 1200
})

MarketCallbacks.set('steampunkdoggy', (player) => {
    let profileData = player.profile.Data
    player.AppendPet({
        name: 'Steampunk Doggy',
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    })

    //player.AppendTool('test')
    //profileData.StatValues.RobuxSpent += 1200
})

MarketCallbacks.set('megablock', (player) => {
    let profileData = player.profile.Data
    player.AppendPet({
        name: 'Mega Block',
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    })
    //player.AppendTool('test')
    //profileData.StatValues.RobuxSpent += 1200
})

MarketCallbacks.set('buyegg1', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Starter', EggBuyType.Single)
    //profileData.StatValues.RobuxSpent += 1200
})

MarketCallbacks.set('buyegg2', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Beach', EggBuyType.Single)
    //profileData.StatValues.RobuxSpent += 1200
})

MarketCallbacks.set('buyegg3', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Sea', EggBuyType.Single)
    //profileData.StatValues.RobuxSpent += 1200
})

MarketCallbacks.set('buyegg4', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Sakura', EggBuyType.Single)
    //profileData.StatValues.RobuxSpent += 1200
})

MarketCallbacks.set('buyegg5', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Flower', EggBuyType.Single)
    //profileData.StatValues.RobuxSpent += 1200
})

MarketCallbacks.set('buyegg6', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Mountain', EggBuyType.Single)
    //profileData.StatValues.RobuxSpent += 1200
})

MarketCallbacks.set('buyshadowegg', (player) => {
    let profileData = player.profile.Data
    player.OpenEggBypass('Shadow', EggBuyType.Single)
    //profileData.StatValues.RobuxSpent += 1200
})
