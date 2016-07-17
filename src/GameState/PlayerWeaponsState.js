'use strict';

module.exports = class PlayerWeaponsState {

  constructor(weaponsData) {
    this.weaponsData = weaponsData;

    // TODO account for tazers
    // TODO check for grenades, bombs, primed molotovs
  }

  knifeIsEquipped() {
    return this.weaponsData.weapon_0.state === "active";
  }

  pistolIsEquipped() {
    return this.weaponsData.weapon_1.state === "active";
  }

  getPistolAmmoRemainingInClip() {
    return this.weaponsData.weapon_1.ammo_clip;
  }

  getPistolAmmoSpentInClip() {
    return this.weaponsData.weapon_1.ammo_clip_max - this.weaponsData.weapon_1.ammo_clip;
  }

  getPistolNameSlug() {
    return this.weaponsData.weapon_1.name;
  }

  getPistolSkinSlug() {
    return this.weaponsData.weapon_1.paintkit;
  }

  primaryWeaponIsEquipped() {
    return this.weaponsData.weapon_2.state === "active";
  }

  getPrimaryWeaponAmmoRemainingInClip() {
    return this.weaponsData.weapon_2.ammo_clip;
  }

  getPrimaryWeaponAmmoSpentInClip() {
    return this.weaponsData.weapon_2.ammo_clip_max - this.weaponsData.weapon_2.ammo_clip;
  }

  getPrimaryWeaponNameSlug() {
    return this.weaponsData.weapon_2.name;
  }

  getPrimaryWeaponSkinSlug() {
    return this.weaponsData.weapon_2.paintkit;
  }
}
