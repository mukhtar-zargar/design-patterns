import { inject, injectable } from "inversify";
import "reflect-metadata";
import { ThrowableWeapon, Warrior, Weapon } from "./interfaces";
import { Types } from "./types";

@injectable()
class Katana implements Weapon {
  public hit(): string {
    return "cut!";
  }
}

@injectable()
class Kunai implements Weapon {
  public hit(): string {
    return "bruise!";
  }
}

@injectable()
class Shuriken implements ThrowableWeapon {
  public throw(): string {
    return "hit!";
  }
}

@injectable()
class Ninja implements Warrior {
  // private _katana: Weapon;
  // private _shuriken: ThrowableWeapon;

  // public constructor(
  //   @inject(Types.Weapon) katana: Weapon,
  //   @inject(Types.ThrowableWeapon) shuriken: ThrowableWeapon
  // ) {
  //   this._katana = katana;
  //   this._shuriken = shuriken;
  // }

  // OR

  @inject(Types.Weapon)
  private _weapon: Weapon;

  @inject(Types.ThrowableWeapon)
  private _shuriken: ThrowableWeapon;

  public fight(): string {
    return this._weapon.hit();
  }

  public sneak(): string {
    return this._shuriken.throw();
  }
}

export { Ninja, Katana, Kunai, Shuriken };
