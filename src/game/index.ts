import EventEmitter from "events";
import TypedEmitter from "typed-emitter";
import Character from "@/game/Character";
import Narrator from "@/game/Narrator";
import { GameEvents } from "@/game/types";
import { Campaign } from "@/pages/api/campaigns/types";

class Game extends (EventEmitter as new () => TypedEmitter<GameEvents>) {
  private _narrator: Narrator;
  private _characters: Character[];
  private _running: boolean;

  constructor(campaign: Campaign) {
    if (!campaign) throw new Error("No campaign provided");

    super();
    this._narrator = new Narrator(campaign.abstract);
    this._characters = [];
    this._running = false;

    this._narrator.on("outcome", (decision) => {
      this.emit("gameUpdate", "narrator", decision);
    });
  }

  addCharacter(character: Character): void {
    this._characters.push(character);
    this._narrator.addCharacter(character);

    character.on("decision", (decision) => {
      this.emit("gameUpdate", "character", decision, character.name);
    });
  }

  async start(): Promise<void> {
    this._running = true;

    while (this._running) {
      await this._narrator.round();
    }
  }

  stop(): void {
    this._running = false;
  }

  get running(): boolean {
    return this._running;
  }
}

export default Game;
