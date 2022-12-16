// you cant just edit the DOM from the main process because it has no access to the renderer's document context. They're in entirely different processes!
// This is where attaching a preload script to your renderer comes in handy. A preload script runs before the renderer process is loaded, and has access to both renderer globals (e.g. window and document) and a Node.js environment.

window.addEventListener('DOMContentLoaded', _ => {
  const replaceText = (selector, text) => {
    const element = document.querySelector(selector)
    if (element) element.innerText = text
  }
  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`#${dependency}-version`, process.versions[dependency])
  }
})
