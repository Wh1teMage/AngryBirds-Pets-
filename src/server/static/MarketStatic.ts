import { ServerPlayerComponent } from "server/components/PlayerComponent";
import { WorldsData } from "shared/info/WorldInfo";
import { BuyType } from "shared/interfaces/EggData";

export const MarketCallbacks = new Map<string, (player: ServerPlayerComponent) => void>([])

MarketCallbacks.set('test', (player) => {
    print('Purchased!')
    player.OpenEggBypass('Donate', BuyType.Single)
    print(player.profile.Data)
})

MarketCallbacks.set('tinypackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(100*multi)
})

MarketCallbacks.set('smallpackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(100*multi)
})

MarketCallbacks.set('mediumpackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(100*multi)
})

MarketCallbacks.set('largepackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(100*multi)
})

MarketCallbacks.set('hugepackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(100*multi)
})

MarketCallbacks.set('megapackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(100*multi)
})

MarketCallbacks.set('megahugepackgems', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetGems(100*multi)
})

MarketCallbacks.set('tinypackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(100*multi)
})

MarketCallbacks.set('smallpackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(100*multi)
})

MarketCallbacks.set('mediumpackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(100*multi)
})

MarketCallbacks.set('largepackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(100*multi)
})

MarketCallbacks.set('hugepackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(100*multi)
})

MarketCallbacks.set('megapackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(100*multi)
})

MarketCallbacks.set('megahugepackaccuracy', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetStrength(100*multi)
})

MarketCallbacks.set('tinypackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(100*multi)
})

MarketCallbacks.set('smallpackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(100*multi)
})

MarketCallbacks.set('mediumpackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(100*multi)
})

MarketCallbacks.set('largepackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(100*multi)
})

MarketCallbacks.set('hugepackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(100*multi)
})

MarketCallbacks.set('megapackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(100*multi)
})

MarketCallbacks.set('megahugepackwins', (player) => {
    let profileData = player.profile.Data
    let worldData = WorldsData.get(profileData.Config.MaxWorld)

    if (!worldData) { return }

    let multi = worldData.multipliers.get('product') || 1
    player.SetWins(100*multi)
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

MarketCallbacks.set('vippack', (player) => {
    let profileData = player.profile.Data
    profileData.Multipliers.StrengthMul += .5
    profileData.Multipliers.WinsMul += .5
})

