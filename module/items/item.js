/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */

export class CoCItem extends Item {

    initialize() {
        try {
            this.prepareData();
        } catch(err) {
            console.error(`Failed to initialize data for ${this.constructor.name} ${this.id}:`);
            console.error(err);
        }
    }

    /** @override */
    prepareData() {
        super.prepareData();
        const itemData = this.data;
        const actorData = (this.actor) ? this.actor.data : null;
        switch (itemData.type) {
            case "item" :
                this._prepareArmorData(itemData, actorData);
                this._prepareWeaponData(itemData, actorData);
                break;
            case "capacity" :
                this._prepareCapacityData(itemData, actorData);
                break;
            case "path" :
                this._preparePathData(itemData, actorData);
                break;
            case "profile" :
                this._prepareProfileData(itemData, actorData);
                break;
            default :
                break;
        }
    }

    _prepareCapacityData(itemData, actorData) {
        if (!itemData.data.key) itemData.data.key = itemData.name.slugify({strict: true});
    }

    _preparePathData(itemData, actorData) {
        if (!itemData.data.key) itemData.data.key = itemData.name.slugify({strict: true});
    }

    _prepareProfileData(itemData, actorData) {
        if (!itemData.data.key) itemData.data.key = itemData.name.slugify({strict: true});
    }

    _prepareArmorData(itemData, actorData) {
        itemData.data.def = parseInt(itemData.data.defBase, 10) + parseInt(itemData.data.defBonus, 10);
    }

    _prepareWeaponData(itemData, actorData) {
        itemData.data.skillBonus = (itemData.data.skillBonus) ? itemData.data.skillBonus : 0;
        itemData.data.dmgBonus = (itemData.data.dmgBonus) ? itemData.data.dmgBonus : 0;
        // console.log(actorData);
        if (actorData) {
            // Compute skill mod
            const skillMod = eval("actorData.data." + itemData.data.skill.split("@")[1]);
            itemData.data.mod = parseInt(skillMod) + parseInt(itemData.data.skillBonus);
            // Compute damage mod
            const dmgStat = eval("actorData.data." + itemData.data.dmgStat.split("@")[1]);
            const dmgBonus = (dmgStat) ? parseInt(dmgStat) + parseInt(itemData.data.dmgBonus) : parseInt(itemData.data.dmgBonus);
            if (dmgBonus < 0) itemData.data.dmg = itemData.data.dmgBase + " - " + parseInt(-dmgBonus);
            else if (dmgBonus === 0) itemData.data.dmg = itemData.data.dmgBase;
            else itemData.data.dmg = itemData.data.dmgBase + " + " + dmgBonus;
        }
    }

}
