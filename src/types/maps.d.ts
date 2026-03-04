/* eslint-disable @typescript-eslint/no-explicit-any */

interface Window {
  google: {
    maps: {
      Map: new (el: HTMLElement, opts: any) => any;
      Marker: new (opts: any) => any;
      InfoWindow: new (opts: any) => any;
    };
  };
  naver: {
    maps: {
      Map: new (el: HTMLElement, opts: any) => any;
      Marker: new (opts: any) => any;
      InfoWindow: new (opts: any) => any;
      LatLng: new (lat: number, lng: number) => any;
      Point: new (x: number, y: number) => any;
      Event: {
        addListener: (target: any, event: string, handler: () => void) => void;
      };
    };
  };
}
