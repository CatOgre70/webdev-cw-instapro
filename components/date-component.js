import {formatDistanceToNow} from "date-fns";
import {ru} from "date-fns/locale";

export function howManyTimePassed({date}) {
    const postDate = new Date(Date.parse(date));
    return formatDistanceToNow(postDate, {locale: ru});
}