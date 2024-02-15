import { PlayerAPI } from 'bitmovin-player';

import { DOM } from '../dom';
import { UIInstanceManager } from '../uimanager';
import {
  Component,
  ComponentConfig,
} from './component';
import { PlaybackToggleButton } from './playbacktogglebutton';

export class CustomPlaybackButtons extends Component<ComponentConfig> {
  private playbackToggleButton: PlaybackToggleButton;

  // render forwad and backward buttons and play/pause button
  constructor(config: ComponentConfig = {}) {
    super(config);
    this.playbackToggleButton = new PlaybackToggleButton();

    this.config = this.mergeConfig(
      config,
      {
        cssClass: "ui-custom-playback-buttons",
      },
      this.config
    );
  }

  configure(player: PlayerAPI, uimanager: UIInstanceManager): void {
    // Update button state through API events
    super.configure(player, uimanager);

    // play/pause button
    this.playbackToggleButton.configure(player, uimanager);

    // forward button
    let forwardButton = this.getDomElement().find(".ui-forward-button");
    forwardButton.on("click", () => {
      player.seek(player.getCurrentTime() + 10);
    });

    // rewind button
    let rewindButton = this.getDomElement().find(".ui-rewind-button");
    rewindButton.on("click", () => {
      player.seek(player.getCurrentTime() - 10);
    });
  }

  // render the buttons
  protected toDomElement(): DOM {
    let dom = super.toDomElement();
    // append the rewind button
    let rewindButton = new DOM("button", {
      class: "ui-rewind-button",
      role: "button",
      "aria-label": "Rewind 10 seconds",
    }).append(
      new DOM("span", {
        class: "rewind-icon",
      })
    );

    dom.append(rewindButton);

    // append the play/pause button
    dom.append(this.playbackToggleButton.getDomElement());

    // append the forward button
    let forwardButton = new DOM("button", {
      class: "ui-forward-button",
      role: "button",
      "aria-label": "Forward 10 seconds",
    }).append(
      new DOM("span", {
        class: "forward-icon",
      })
    );
    dom.append(forwardButton);

    return dom;
  }
}
