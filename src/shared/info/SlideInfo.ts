import { ISlideData } from "shared/interfaces/SlideData";

export const SlidesData = new Map<string, ISlideData>()

SlidesData.set('Slide1', {
    startPosition: new Vector3(0,0,0),
    triggerPosition: new Vector3(0,0,0),
    length: 0,
    reward: {}
})