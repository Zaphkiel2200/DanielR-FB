import { NavigateActions } from "../flux/Actions";

export default function Navigate(path: string) {
    window.history.replaceState({}, '', '' + path);
    NavigateActions.navigate(path);
}
