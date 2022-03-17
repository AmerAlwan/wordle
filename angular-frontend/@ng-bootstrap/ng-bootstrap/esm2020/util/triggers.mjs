import { Observable, merge } from 'rxjs';
import { share, filter, delay, map } from 'rxjs/operators';
export class Trigger {
    constructor(open, close) {
        this.open = open;
        this.close = close;
        if (!close) {
            this.close = open;
        }
    }
    isManual() { return this.open === 'manual' || this.close === 'manual'; }
}
const DEFAULT_ALIASES = {
    'hover': ['mouseenter', 'mouseleave'],
    'focus': ['focusin', 'focusout'],
};
export function parseTriggers(triggers, aliases = DEFAULT_ALIASES) {
    const trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    const parsedTriggers = trimmedTriggers.split(/\s+/).map(trigger => trigger.split(':')).map((triggerPair) => {
        let alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    });
    const manualTriggers = parsedTriggers.filter(triggerPair => triggerPair.isManual());
    if (manualTriggers.length > 1) {
        throw 'Triggers parse error: only one manual trigger is allowed';
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw 'Triggers parse error: manual trigger can\'t be mixed with other triggers';
    }
    return parsedTriggers;
}
export function observeTriggers(renderer, nativeElement, triggers, isOpenedFn) {
    return new Observable(subscriber => {
        const listeners = [];
        const openFn = () => subscriber.next(true);
        const closeFn = () => subscriber.next(false);
        const toggleFn = () => subscriber.next(!isOpenedFn());
        triggers.forEach((trigger) => {
            if (trigger.open === trigger.close) {
                listeners.push(renderer.listen(nativeElement, trigger.open, toggleFn));
            }
            else {
                listeners.push(renderer.listen(nativeElement, trigger.open, openFn), renderer.listen(nativeElement, trigger.close, closeFn));
            }
        });
        return () => { listeners.forEach(unsubscribeFn => unsubscribeFn()); };
    });
}
const delayOrNoop = (time) => time > 0 ? delay(time) : (a) => a;
export function triggerDelay(openDelay, closeDelay, isOpenedFn) {
    return (input$) => {
        let pending = null;
        const filteredInput$ = input$.pipe(map(open => ({ open })), filter(event => {
            const currentlyOpen = isOpenedFn();
            if (currentlyOpen !== event.open && (!pending || pending.open === currentlyOpen)) {
                pending = event;
                return true;
            }
            if (pending && pending.open !== event.open) {
                pending = null;
            }
            return false;
        }), share());
        const delayedOpen$ = filteredInput$.pipe(filter(event => event.open), delayOrNoop(openDelay));
        const delayedClose$ = filteredInput$.pipe(filter(event => !event.open), delayOrNoop(closeDelay));
        return merge(delayedOpen$, delayedClose$)
            .pipe(filter(event => {
            if (event === pending) {
                pending = null;
                return event.open !== isOpenedFn();
            }
            return false;
        }), map(event => event.open));
    };
}
export function listenToTriggers(renderer, nativeElement, triggers, isOpenedFn, openFn, closeFn, openDelay = 0, closeDelay = 0) {
    const parsedTriggers = parseTriggers(triggers);
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return () => { };
    }
    const subscription = observeTriggers(renderer, nativeElement, parsedTriggers, isOpenedFn)
        .pipe(triggerDelay(openDelay, closeDelay, isOpenedFn))
        .subscribe(open => (open ? openFn() : closeFn()));
    return () => subscription.unsubscribe();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbC90cmlnZ2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHekQsTUFBTSxPQUFPLE9BQU87SUFDbEIsWUFBbUIsSUFBWSxFQUFTLEtBQWM7UUFBbkMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVM7UUFDcEQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQUVELFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztDQUN6RTtBQUVELE1BQU0sZUFBZSxHQUFHO0lBQ3RCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUM7SUFDckMsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztDQUNqQyxDQUFDO0FBRUYsTUFBTSxVQUFVLGFBQWEsQ0FBQyxRQUFnQixFQUFFLE9BQU8sR0FBRyxlQUFlO0lBQ3ZFLE1BQU0sZUFBZSxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWhELElBQUksZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDaEMsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUVELE1BQU0sY0FBYyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FB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QUNwQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUM1QixRQUFtQixFQUFFLGFBQTBCLEVBQUUsUUFBZ0IsRUFBRSxVQUF5QixFQUFFLE1BQWtCLEVBQ2hILE9BQW1CLEVBQUUsU0FBUyxHQUFHLENBQUMsRUFBRSxVQUFVLEdBQUcsQ0FBQztJQUNwRCxNQUFNLGNBQWMsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFL0MsSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDL0QsT0FBTyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7S0FDakI7SUFFRCxNQUFNLFlBQVksR0FBRyxlQUFlLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDO1NBQy9ELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNyRCxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUzRSxPQUFPLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMxQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlLCBtZXJnZX0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7c2hhcmUsIGZpbHRlciwgZGVsYXksIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge1JlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJpZ2dlciB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIG9wZW46IHN0cmluZywgcHVibGljIGNsb3NlPzogc3RyaW5nKSB7XHJcbiAgICBpZiAoIWNsb3NlKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UgPSBvcGVuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNNYW51YWwoKSB7IHJldHVybiB0aGlzLm9wZW4gPT09ICdtYW51YWwnIHx8IHRoaXMuY2xvc2UgPT09ICdtYW51YWwnOyB9XHJcbn1cclxuXHJcbmNvbnN0IERFRkFVTFRfQUxJQVNFUyA9IHtcclxuICAnaG92ZXInOiBbJ21vdXNlZW50ZXInLCAnbW91c2VsZWF2ZSddLFxyXG4gICdmb2N1cyc6IFsnZm9jdXNpbicsICdmb2N1c291dCddLFxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVHJpZ2dlcnModHJpZ2dlcnM6IHN0cmluZywgYWxpYXNlcyA9IERFRkFVTFRfQUxJQVNFUyk6IFRyaWdnZXJbXSB7XHJcbiAgY29uc3QgdHJpbW1lZFRyaWdnZXJzID0gKHRyaWdnZXJzIHx8ICcnKS50cmltKCk7XHJcblxyXG4gIGlmICh0cmltbWVkVHJpZ2dlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICBjb25zdCBwYXJzZWRUcmlnZ2VycyA9IHRyaW1tZWRUcmlnZ2Vycy5zcGxpdCgvXFxzKy8pLm1hcCh0cmlnZ2VyID0+IHRyaWdnZXIuc3BsaXQoJzonKSkubWFwKCh0cmlnZ2VyUGFpcikgPT4ge1xyXG4gICAgbGV0IGFsaWFzID0gYWxpYXNlc1t0cmlnZ2VyUGFpclswXV0gfHwgdHJpZ2dlclBhaXI7XHJcbiAgICByZXR1cm4gbmV3IFRyaWdnZXIoYWxpYXNbMF0sIGFsaWFzWzFdKTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgbWFudWFsVHJpZ2dlcnMgPSBwYXJzZWRUcmlnZ2Vycy5maWx0ZXIodHJpZ2dlclBhaXIgPT4gdHJpZ2dlclBhaXIuaXNNYW51YWwoKSk7XHJcblxyXG4gIGlmIChtYW51YWxUcmlnZ2Vycy5sZW5ndGggPiAxKSB7XHJcbiAgICB0aHJvdyAnVHJpZ2dlcnMgcGFyc2UgZXJyb3I6IG9ubHkgb25lIG1hbnVhbCB0cmlnZ2VyIGlzIGFsbG93ZWQnO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1hbnVhbFRyaWdnZXJzLmxlbmd0aCA9PT0gMSAmJiBwYXJzZWRUcmlnZ2Vycy5sZW5ndGggPiAxKSB7XHJcbiAgICB0aHJvdyAnVHJpZ2dlcnMgcGFyc2UgZXJyb3I6IG1hbnVhbCB0cmlnZ2VyIGNhblxcJ3QgYmUgbWl4ZWQgd2l0aCBvdGhlciB0cmlnZ2Vycyc7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcGFyc2VkVHJpZ2dlcnM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlVHJpZ2dlcnMoXHJcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLCBuYXRpdmVFbGVtZW50OiBIVE1MRWxlbWVudCwgdHJpZ2dlcnM6IFRyaWdnZXJbXSwgaXNPcGVuZWRGbjogKCkgPT4gYm9vbGVhbikge1xyXG4gIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPihzdWJzY3JpYmVyID0+IHtcclxuICAgIGNvbnN0IGxpc3RlbmVyczogKCgpID0+IHZvaWQpW10gPSBbXTtcclxuICAgIGNvbnN0IG9wZW5GbiA9ICgpID0+IHN1YnNjcmliZXIubmV4dCh0cnVlKTtcclxuICAgIGNvbnN0IGNsb3NlRm4gPSAoKSA9PiBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xyXG4gICAgY29uc3QgdG9nZ2xlRm4gPSAoKSA9PiBzdWJzY3JpYmVyLm5leHQoIWlzT3BlbmVkRm4oKSk7XHJcblxyXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcjogVHJpZ2dlcikgPT4ge1xyXG4gICAgICBpZiAodHJpZ2dlci5vcGVuID09PSB0cmlnZ2VyLmNsb3NlKSB7XHJcbiAgICAgICAgbGlzdGVuZXJzLnB1c2gocmVuZGVyZXIubGlzdGVuKG5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIub3BlbiwgdG9nZ2xlRm4pKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsaXN0ZW5lcnMucHVzaChcclxuICAgICAgICAgICAgcmVuZGVyZXIubGlzdGVuKG5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIub3Blbiwgb3BlbkZuKSxcclxuICAgICAgICAgICAgcmVuZGVyZXIubGlzdGVuKG5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIuY2xvc2UgISwgY2xvc2VGbikpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4geyBsaXN0ZW5lcnMuZm9yRWFjaCh1bnN1YnNjcmliZUZuID0+IHVuc3Vic2NyaWJlRm4oKSk7IH07XHJcbiAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IGRlbGF5T3JOb29wID0gPFQ+KHRpbWU6IG51bWJlcikgPT4gdGltZSA+IDAgPyBkZWxheTxUPih0aW1lKSA6IChhOiBPYnNlcnZhYmxlPFQ+KSA9PiBhO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRyaWdnZXJEZWxheShvcGVuRGVsYXk6IG51bWJlciwgY2xvc2VEZWxheTogbnVtYmVyLCBpc09wZW5lZEZuOiAoKSA9PiBib29sZWFuKSB7XHJcbiAgcmV0dXJuIChpbnB1dCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4pID0+IHtcclxuICAgIGxldCBwZW5kaW5nOiB7b3BlbjogYm9vbGVhbn0gfCBudWxsID0gbnVsbDtcclxuICAgIGNvbnN0IGZpbHRlcmVkSW5wdXQkID0gaW5wdXQkLnBpcGUoXHJcbiAgICAgICAgbWFwKG9wZW4gPT4gKHtvcGVufSkpLCBmaWx0ZXIoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY3VycmVudGx5T3BlbiA9IGlzT3BlbmVkRm4oKTtcclxuICAgICAgICAgIGlmIChjdXJyZW50bHlPcGVuICE9PSBldmVudC5vcGVuICYmICghcGVuZGluZyB8fCBwZW5kaW5nLm9wZW4gPT09IGN1cnJlbnRseU9wZW4pKSB7XHJcbiAgICAgICAgICAgIHBlbmRpbmcgPSBldmVudDtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAocGVuZGluZyAmJiBwZW5kaW5nLm9wZW4gIT09IGV2ZW50Lm9wZW4pIHtcclxuICAgICAgICAgICAgcGVuZGluZyA9IG51bGw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc2hhcmUoKSk7XHJcbiAgICBjb25zdCBkZWxheWVkT3BlbiQgPSBmaWx0ZXJlZElucHV0JC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudC5vcGVuKSwgZGVsYXlPck5vb3Aob3BlbkRlbGF5KSk7XHJcbiAgICBjb25zdCBkZWxheWVkQ2xvc2UkID0gZmlsdGVyZWRJbnB1dCQucGlwZShmaWx0ZXIoZXZlbnQgPT4gIWV2ZW50Lm9wZW4pLCBkZWxheU9yTm9vcChjbG9zZURlbGF5KSk7XHJcbiAgICByZXR1cm4gbWVyZ2UoZGVsYXllZE9wZW4kLCBkZWxheWVkQ2xvc2UkKVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICBmaWx0ZXIoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChldmVudCA9PT0gcGVuZGluZykge1xyXG4gICAgICAgICAgICAgICAgcGVuZGluZyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQub3BlbiAhPT0gaXNPcGVuZWRGbigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBtYXAoZXZlbnQgPT4gZXZlbnQub3BlbikpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5Ub1RyaWdnZXJzKFxyXG4gICAgcmVuZGVyZXI6IFJlbmRlcmVyMiwgbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQsIHRyaWdnZXJzOiBzdHJpbmcsIGlzT3BlbmVkRm46ICgpID0+IGJvb2xlYW4sIG9wZW5GbjogKCkgPT4gdm9pZCxcclxuICAgIGNsb3NlRm46ICgpID0+IHZvaWQsIG9wZW5EZWxheSA9IDAsIGNsb3NlRGVsYXkgPSAwKSB7XHJcbiAgY29uc3QgcGFyc2VkVHJpZ2dlcnMgPSBwYXJzZVRyaWdnZXJzKHRyaWdnZXJzKTtcclxuXHJcbiAgaWYgKHBhcnNlZFRyaWdnZXJzLmxlbmd0aCA9PT0gMSAmJiBwYXJzZWRUcmlnZ2Vyc1swXS5pc01hbnVhbCgpKSB7XHJcbiAgICByZXR1cm4gKCkgPT4ge307XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdWJzY3JpcHRpb24gPSBvYnNlcnZlVHJpZ2dlcnMocmVuZGVyZXIsIG5hdGl2ZUVsZW1lbnQsIHBhcnNlZFRyaWdnZXJzLCBpc09wZW5lZEZuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh0cmlnZ2VyRGVsYXkob3BlbkRlbGF5LCBjbG9zZURlbGF5LCBpc09wZW5lZEZuKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShvcGVuID0+IChvcGVuID8gb3BlbkZuKCkgOiBjbG9zZUZuKCkpKTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG59XHJcbiJdfQ==