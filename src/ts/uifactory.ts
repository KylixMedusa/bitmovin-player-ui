import { PlayerAPI } from 'bitmovin-player';

import { AdClickOverlay } from './components/adclickoverlay';
import { AdMessageLabel } from './components/admessagelabel';
import { AdSkipButton } from './components/adskipbutton';
import { AirPlayToggleButton } from './components/airplaytogglebutton';
import { AudioQualitySelectBox } from './components/audioqualityselectbox';
import { AudioTrackListBox } from './components/audiotracklistbox';
import { AudioTrackSelectBox } from './components/audiotrackselectbox';
import { BufferingOverlay } from './components/bufferingoverlay';
import { CastStatusOverlay } from './components/caststatusoverlay';
import { CastToggleButton } from './components/casttogglebutton';
import { CastUIContainer } from './components/castuicontainer';
import { CloseButton } from './components/closebutton';
import { Container } from './components/container';
import { ControlBar } from './components/controlbar';
import { CustomPlaybackButtons } from './components/customplaybackbuttons';
import { ErrorMessageOverlay } from './components/errormessageoverlay';
import { FullscreenToggleButton } from './components/fullscreentogglebutton';
import { Label } from './components/label';
import {
  MetadataLabel,
  MetadataLabelContent,
} from './components/metadatalabel';
import {
  PictureInPictureToggleButton,
} from './components/pictureinpicturetogglebutton';
import { PlaybackSpeedSelectBox } from './components/playbackspeedselectbox';
import {
  PlaybackTimeLabel,
  PlaybackTimeLabelMode,
} from './components/playbacktimelabel';
import { PlaybackToggleButton } from './components/playbacktogglebutton';
import { PlaybackToggleOverlay } from './components/playbacktoggleoverlay';
import { RecommendationOverlay } from './components/recommendationoverlay';
import { SeekBar } from './components/seekbar';
import { SeekBarLabel } from './components/seekbarlabel';
import { SettingsPanel } from './components/settingspanel';
import { SettingsPanelItem } from './components/settingspanelitem';
import { SettingsPanelPage } from './components/settingspanelpage';
import {
  SettingsPanelPageOpenButton,
} from './components/settingspanelpageopenbutton';
import { SettingsToggleButton } from './components/settingstogglebutton';
import { Spacer } from './components/spacer';
import { SubtitleListBox } from './components/subtitlelistbox';
import { SubtitleOverlay } from './components/subtitleoverlay';
import { SubtitleSelectBox } from './components/subtitleselectbox';
import {
  SubtitleSettingsLabel,
} from './components/subtitlesettings/subtitlesettingslabel';
import {
  SubtitleSettingsPanelPage,
} from './components/subtitlesettings/subtitlesettingspanelpage';
import { TitleBar } from './components/titlebar';
import { UIContainer } from './components/uicontainer';
import { VideoQualitySelectBox } from './components/videoqualityselectbox';
import { VolumeSlider } from './components/volumeslider';
import { VolumeToggleButton } from './components/volumetogglebutton';
import { VRToggleButton } from './components/vrtogglebutton';
import { Watermark } from './components/watermark';
import { i18n } from './localization/i18n';
import { PlayerUtils } from './playerutils';
import {
  ListNavigationGroup,
  ListOrientation,
} from './spatialnavigation/ListNavigationGroup';
import { RootNavigationGroup } from './spatialnavigation/rootnavigationgroup';
import { SpatialNavigation } from './spatialnavigation/spatialnavigation';
import { UIConfig } from './uiconfig';
import {
  UIConditionContext,
  UIManager,
} from './uimanager';

export namespace UIFactory {
  export function buildDefaultUI(
    player: PlayerAPI,
    config: UIConfig = {}
  ): UIManager {
    return UIFactory.buildModernUI(player, config);
  }

  export function buildDefaultSmallScreenUI(
    player: PlayerAPI,
    config: UIConfig = {}
  ): UIManager {
    return UIFactory.buildModernSmallScreenUI(player, config);
  }

  export function buildDefaultCastReceiverUI(
    player: PlayerAPI,
    config: UIConfig = {}
  ): UIManager {
    return UIFactory.buildModernCastReceiverUI(player, config);
  }

  export function buildDefaultTvUI(
    player: PlayerAPI,
    config: UIConfig = {}
  ): UIManager {
    return UIFactory.buildModernTvUI(player, config);
  }

  export function modernUI() {
    let subtitleOverlay = new SubtitleOverlay();

    let mainSettingsPanelPage = new SettingsPanelPage({
      components: [
        new SettingsPanelItem(
          i18n.getLocalizer("settings.video.quality"),
          new VideoQualitySelectBox()
        ),
        new SettingsPanelItem(
          i18n.getLocalizer("speed"),
          new PlaybackSpeedSelectBox()
        ),
        new SettingsPanelItem(
          i18n.getLocalizer("settings.audio.track"),
          new AudioTrackSelectBox()
        ),
        new SettingsPanelItem(
          i18n.getLocalizer("settings.audio.quality"),
          new AudioQualitySelectBox()
        ),
      ],
    });

    let settingsPanel = new SettingsPanel({
      components: [mainSettingsPanelPage],
      hidden: true,
    });

    let subtitleSettingsPanelPage = new SubtitleSettingsPanelPage({
      settingsPanel: settingsPanel,
      overlay: subtitleOverlay,
    });

    const subtitleSelectBox = new SubtitleSelectBox();

    let subtitleSettingsOpenButton = new SettingsPanelPageOpenButton({
      targetPage: subtitleSettingsPanelPage,
      container: settingsPanel,
      ariaLabel: i18n.getLocalizer("settings.subtitles"),
      text: i18n.getLocalizer("open"),
    });

    mainSettingsPanelPage.addComponent(
      new SettingsPanelItem(
        new SubtitleSettingsLabel({
          text: i18n.getLocalizer("settings.subtitles"),
          opener: subtitleSettingsOpenButton,
        }),
        subtitleSelectBox,
        {
          role: "menubar",
        }
      )
    );

    settingsPanel.addComponent(subtitleSettingsPanelPage);

    let controlBar = new ControlBar({
      components: [
        settingsPanel,
        new Container({
          components: [
            new PlaybackTimeLabel({
              timeLabelMode: PlaybackTimeLabelMode.CurrentTime,
              hideInLivePlayback: true,
            }),
            new SeekBar({ label: new SeekBarLabel() }),
            new PlaybackTimeLabel({
              timeLabelMode: PlaybackTimeLabelMode.TotalTime,
              cssClasses: ["text-right"],
            }),
          ],
          cssClasses: ["controlbar-top"],
        }),
        new Container({
          components: [
            new PlaybackToggleButton(),
            new VolumeToggleButton(),
            new VolumeSlider(),
            new Spacer(),
            new PictureInPictureToggleButton(),
            new AirPlayToggleButton(),
            new CastToggleButton(),
            new VRToggleButton(),
            new SettingsToggleButton({ settingsPanel: settingsPanel }),
            new FullscreenToggleButton(),
          ],
          cssClasses: ["controlbar-bottom"],
        }),
      ],
    });

    return new UIContainer({
      components: [
        subtitleOverlay,
        new BufferingOverlay(),
        new PlaybackToggleOverlay(),
        new CastStatusOverlay(),
        controlBar,
        new TitleBar(),
        new RecommendationOverlay(),
        new Watermark(),
        new ErrorMessageOverlay(),
      ],
      hideDelay: 2000,
      hidePlayerStateExceptions: [
        PlayerUtils.PlayerState.Prepared,
        PlayerUtils.PlayerState.Paused,
        PlayerUtils.PlayerState.Finished,
      ],
    });
  }

  export function modernAdsUI() {
    return new UIContainer({
      components: [
        new BufferingOverlay(),
        new AdClickOverlay(),
        new PlaybackToggleOverlay(),
        new Container({
          components: [
            new AdMessageLabel({
              text: i18n.getLocalizer("ads.remainingTime"),
            }),
            new AdSkipButton(),
          ],
          cssClass: "ui-ads-status",
        }),
        new ControlBar({
          components: [
            new Container({
              components: [
                new PlaybackToggleButton(),
                new VolumeToggleButton(),
                new VolumeSlider(),
                new Spacer(),
                new FullscreenToggleButton(),
              ],
              cssClasses: ["controlbar-bottom"],
            }),
          ],
        }),
      ],
      cssClasses: ["ui-skin-ads"],
      hideDelay: 2000,
      hidePlayerStateExceptions: [
        PlayerUtils.PlayerState.Prepared,
        PlayerUtils.PlayerState.Paused,
        PlayerUtils.PlayerState.Finished,
      ],
    });
  }

  export function modernSmallScreenUI() {
    let subtitleOverlay = new SubtitleOverlay();

    let mainSettingsPanelPage = new SettingsPanelPage({
      components: [
        new SettingsPanelItem(
          i18n.getLocalizer("settings.video.quality"),
          new VideoQualitySelectBox()
        ),
        new SettingsPanelItem(
          i18n.getLocalizer("speed"),
          new PlaybackSpeedSelectBox()
        ),
        new SettingsPanelItem(
          i18n.getLocalizer("settings.audio.track"),
          new AudioTrackSelectBox()
        ),
        new SettingsPanelItem(
          i18n.getLocalizer("settings.audio.quality"),
          new AudioQualitySelectBox()
        ),
      ],
    });

    let settingsPanel = new SettingsPanel({
      components: [mainSettingsPanelPage],
      hidden: true,
      pageTransitionAnimation: false,
      hideDelay: -1,
      cssClasses: ["ui-settings-panel-small-screen"],
    });

    let subtitleSettingsPanelPage = new SubtitleSettingsPanelPage({
      settingsPanel: settingsPanel,
      overlay: subtitleOverlay,
    });

    let subtitleSettingsOpenButton = new SettingsPanelPageOpenButton({
      targetPage: subtitleSettingsPanelPage,
      container: settingsPanel,
      ariaLabel: i18n.getLocalizer("settings.subtitles"),
      text: i18n.getLocalizer("open"),
    });

    const subtitleSelectBox = new SubtitleSelectBox();

    mainSettingsPanelPage.addComponent(
      new SettingsPanelItem(
        new SubtitleSettingsLabel({
          text: i18n.getLocalizer("settings.subtitles"),
          opener: subtitleSettingsOpenButton,
        }),
        subtitleSelectBox,
        {
          role: "menubar",
        }
      )
    );

    settingsPanel.addComponent(subtitleSettingsPanelPage);

    settingsPanel.addComponent(new CloseButton({ target: settingsPanel }));
    subtitleSettingsPanelPage.addComponent(
      new CloseButton({ target: settingsPanel })
    );

    let playbackControls = new ControlBar({
      components: [new CustomPlaybackButtons()],
      cssClasses: ["controlbar-playback-controls"],
    });

    let controlBar = new ControlBar({
      components: [
        new Container({
          components: [
            new PlaybackTimeLabel({
              timeLabelMode: PlaybackTimeLabelMode.CurrentTime,
              hideInLivePlayback: true,
            }),
            new SeekBar({ label: new SeekBarLabel() }),
            new PlaybackTimeLabel({
              timeLabelMode: PlaybackTimeLabelMode.TotalTime,
              cssClasses: ["text-right"],
            }),
          ],
          cssClasses: ["controlbar-top"],
        }),
      ],
      cssClasses: ["controlbar-playback-seekbar"],
    });

    return new UIContainer({
      components: [
        subtitleOverlay,
        new BufferingOverlay(),
        new CastStatusOverlay(),
        // new PlaybackToggleOverlay(),
        // new CustomPlaybackControlOverlay(),
        new RecommendationOverlay(),
        controlBar,
        playbackControls,
        new TitleBar({
          components: [
            new MetadataLabel({ content: MetadataLabelContent.Title }),
            new CastToggleButton(),
            new VRToggleButton(),
            new PictureInPictureToggleButton(),
            new AirPlayToggleButton(),
            new VolumeToggleButton(),
            new SettingsToggleButton({ settingsPanel: settingsPanel }),
            new FullscreenToggleButton(),
          ],
          cssClasses: ["ui-titlebar-small-screen"],
        }),
        settingsPanel,
        new Watermark(),
        new ErrorMessageOverlay(),
      ],
      cssClasses: ["ui-skin-smallscreen"],
      hideDelay: 2000,
      hidePlayerStateExceptions: [
        PlayerUtils.PlayerState.Prepared,
        PlayerUtils.PlayerState.Paused,
        PlayerUtils.PlayerState.Finished,
      ],
    });
  }

  export function modernSmallScreenAdsUI() {
    return new UIContainer({
      components: [
        new BufferingOverlay(),
        new AdClickOverlay(),
        new PlaybackToggleOverlay(),
        new TitleBar({
          components: [
            // dummy label with no content to move buttons to the right
            new Label({ cssClass: "label-metadata-title" }),
            new FullscreenToggleButton(),
          ],
        }),
        new Container({
          components: [
            new AdMessageLabel({ text: "Ad: {remainingTime} secs" }),
            new AdSkipButton(),
          ],
          cssClass: "ui-ads-status",
        }),
      ],
      cssClasses: ["ui-skin-ads", "ui-skin-smallscreen"],
      hideDelay: 2000,
      hidePlayerStateExceptions: [
        PlayerUtils.PlayerState.Prepared,
        PlayerUtils.PlayerState.Paused,
        PlayerUtils.PlayerState.Finished,
      ],
    });
  }

  export function modernCastReceiverUI() {
    let controlBar = new ControlBar({
      components: [
        new Container({
          components: [
            new PlaybackTimeLabel({
              timeLabelMode: PlaybackTimeLabelMode.CurrentTime,
              hideInLivePlayback: true,
            }),
            new SeekBar({ smoothPlaybackPositionUpdateIntervalMs: -1 }),
            new PlaybackTimeLabel({
              timeLabelMode: PlaybackTimeLabelMode.TotalTime,
              cssClasses: ["text-right"],
            }),
          ],
          cssClasses: ["controlbar-top"],
        }),
      ],
    });

    return new CastUIContainer({
      components: [
        new SubtitleOverlay(),
        new BufferingOverlay(),
        new PlaybackToggleOverlay(),
        new Watermark(),
        controlBar,
        new TitleBar({ keepHiddenWithoutMetadata: true }),
        new ErrorMessageOverlay(),
      ],
      cssClasses: ["ui-skin-cast-receiver"],
      hideDelay: 2000,
      hidePlayerStateExceptions: [
        PlayerUtils.PlayerState.Prepared,
        PlayerUtils.PlayerState.Paused,
        PlayerUtils.PlayerState.Finished,
      ],
    });
  }

  export function buildModernUI(
    player: PlayerAPI,
    config: UIConfig = {}
  ): UIManager {
    // show smallScreen UI only on mobile/handheld devices
    let smallScreenSwitchWidth = 600;

    return new UIManager(
      player,
      [
        {
          ui: modernSmallScreenAdsUI(),
          condition: (context: UIConditionContext) => {
            return (
              context.isMobile &&
              context.documentWidth < smallScreenSwitchWidth &&
              context.isAd &&
              context.adRequiresUi
            );
          },
        },
        {
          ui: modernAdsUI(),
          condition: (context: UIConditionContext) => {
            return context.isAd && context.adRequiresUi;
          },
        },
        {
          ui: modernSmallScreenUI(),
          condition: (context: UIConditionContext) => {
            return (
              !context.isAd &&
              !context.adRequiresUi &&
              context.isMobile &&
              context.documentWidth < smallScreenSwitchWidth
            );
          },
        },
        {
          ui: modernUI(),
          condition: (context: UIConditionContext) => {
            return !context.isAd && !context.adRequiresUi;
          },
        },
      ],
      config
    );
  }

  export function buildModernSmallScreenUI(
    player: PlayerAPI,
    config: UIConfig = {}
  ): UIManager {
    return new UIManager(
      player,
      [
        {
          ui: modernSmallScreenAdsUI(),
          condition: (context: UIConditionContext) => {
            return context.isAd && context.adRequiresUi;
          },
        },
        {
          ui: modernSmallScreenUI(),
          condition: (context: UIConditionContext) => {
            return !context.isAd && !context.adRequiresUi;
          },
        },
      ],
      config
    );
  }

  export function buildModernCastReceiverUI(
    player: PlayerAPI,
    config: UIConfig = {}
  ): UIManager {
    return new UIManager(player, modernCastReceiverUI(), config);
  }

  export function buildModernTvUI(
    player: PlayerAPI,
    config: UIConfig = {}
  ): UIManager {
    return new UIManager(
      player,
      [
        {
          ...modernTvUI(),
        },
      ],
      config
    );
  }

  export function modernTvUI() {
    const subtitleListBox = new SubtitleListBox();
    const subtitleListPanel = new SettingsPanel({
      components: [
        new SettingsPanelPage({
          components: [new SettingsPanelItem(null, subtitleListBox)],
        }),
      ],
      hidden: true,
    });

    const audioTrackListBox = new AudioTrackListBox();
    const audioTrackListPanel = new SettingsPanel({
      components: [
        new SettingsPanelPage({
          components: [new SettingsPanelItem(null, audioTrackListBox)],
        }),
      ],
      hidden: true,
    });

    const seekBar = new SeekBar({ label: new SeekBarLabel() });
    const playbackToggleOverlay = new PlaybackToggleOverlay();
    const subtitleToggleButton = new SettingsToggleButton({
      settingsPanel: subtitleListPanel,
      autoHideWhenNoActiveSettings: true,
      cssClass: "ui-subtitlesettingstogglebutton",
      text: i18n.getLocalizer("settings.subtitles"),
    });
    const audioToggleButton = new SettingsToggleButton({
      settingsPanel: audioTrackListPanel,
      autoHideWhenNoActiveSettings: true,
      cssClass: "ui-audiotracksettingstogglebutton",
      ariaLabel: i18n.getLocalizer("settings.audio.track"),
      text: i18n.getLocalizer("settings.audio.track"),
    });
    const uiContainer = new UIContainer({
      components: [
        new SubtitleOverlay(),
        new BufferingOverlay(),
        playbackToggleOverlay,
        new ControlBar({
          components: [
            new Container({
              components: [
                new PlaybackTimeLabel({
                  timeLabelMode: PlaybackTimeLabelMode.CurrentTime,
                  hideInLivePlayback: true,
                }),
                seekBar,
                new PlaybackTimeLabel({
                  timeLabelMode: PlaybackTimeLabelMode.RemainingTime,
                  cssClasses: ["text-right"],
                }),
              ],
              cssClasses: ["controlbar-top"],
            }),
          ],
        }),
        new TitleBar({
          components: [
            new Container({
              components: [
                new MetadataLabel({ content: MetadataLabelContent.Title }),
                subtitleToggleButton,
                audioToggleButton,
              ],
              cssClasses: ["ui-titlebar-top"],
            }),
            new Container({
              components: [
                new MetadataLabel({
                  content: MetadataLabelContent.Description,
                }),
                subtitleListPanel,
                audioTrackListPanel,
              ],
              cssClasses: ["ui-titlebar-bottom"],
            }),
          ],
        }),
        new RecommendationOverlay(),
        new ErrorMessageOverlay(),
      ],
      cssClasses: ["ui-skin-tv"],
      hideDelay: 2000,
      hidePlayerStateExceptions: [
        PlayerUtils.PlayerState.Prepared,
        PlayerUtils.PlayerState.Paused,
        PlayerUtils.PlayerState.Finished,
      ],
    });

    const spatialNavigation = new SpatialNavigation(
      new RootNavigationGroup(
        uiContainer,
        playbackToggleOverlay,
        seekBar,
        audioToggleButton,
        subtitleToggleButton
      ),
      new ListNavigationGroup(
        ListOrientation.Vertical,
        subtitleListPanel,
        subtitleListBox
      ),
      new ListNavigationGroup(
        ListOrientation.Vertical,
        audioTrackListPanel,
        audioTrackListBox
      )
    );

    return {
      ui: uiContainer,
      spatialNavigation: spatialNavigation,
    };
  }
}
