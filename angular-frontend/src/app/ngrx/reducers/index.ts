import { ActionReducerMap, MetaReducer, Action } from '@ngrx/store';
import { SettingsItem } from '../models/settingsItem.model';


export interface SettingsState {
  settingsState: SettingsItem;
}

