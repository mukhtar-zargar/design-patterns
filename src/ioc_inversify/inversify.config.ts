import { Container } from "inversify";
import { Katana, Kunai, Ninja, Shuriken } from "./entities";
import { ThrowableWeapon, Warrior, Weapon } from "./interfaces";
import { Types } from "./types";

const inversifyContainer = new Container();

inversifyContainer.bind<Warrior>(Types.Warrior).to(Ninja);
inversifyContainer.bind<Weapon>(Types.Weapon).to(Katana);
inversifyContainer.bind<ThrowableWeapon>(Types.ThrowableWeapon).to(Shuriken);

export { inversifyContainer };
