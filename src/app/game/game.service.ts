import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  currentScriptUrl: any;
  renderer: Renderer2;

  constructor(private _renderer: RendererFactory2) {
    this.renderer = _renderer.createRenderer(null, null);
  }

  loadScript(scriptUrl: string): void {
    // debugger;
    if (this.currentScriptUrl == scriptUrl)
      return;

    const parent = document.body;

    // Remove existing script element if it exists
    if (this.currentScriptUrl) {
      const currentScript = document.querySelector(`script[src="${this.currentScriptUrl}"]`);
      console.log("removed script: " + this.currentScriptUrl);
      this.renderer.removeChild(parent, currentScript);
    }

    console.log("loading script: " + scriptUrl);
    // Create new script element
    const script = this.renderer.createElement('script');
    script.src = scriptUrl;
    script.async = true;

    // Save reference to the script element
    this.currentScriptUrl = scriptUrl;

    // Append script element to the document body
    this.renderer.appendChild(parent, script);
  }
}