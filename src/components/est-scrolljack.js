const template = document.createElement('template');
template.innerHTML = `<style>
    .scrolljack__container {}

    .scrolljack__container--outer {}

    .scrolljack__container--inner {
        position: sticky;
        top: 0px;
    }
</style>
<div class="scrolljack__container scrolljack__container--outer">
    <div class="scrolljack__container scrolljack__container--inner">
        <slot></slot>
    </div>
</div>`;

/**
 * TODO
 */
class EstScrolljack extends HTMLElement {
  /**
   * @constructor
   */
  constructor() {
    super();

    if (!this.hasAttribute('for')) {
      throw new Error('est-scrolljack needs a \'for\' attribute that specifies the length of the scrolljack');
    }

    const el = template.content.cloneNode(true);
    el.querySelector('.scrolljack__container--outer').style.height = this.getAttribute('for');
    if (this.hasAttribute('offset')) {
      el.querySelector('.scrolljack__container--inner').style.top = this.getAttribute('offset');
    }

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(el);
    
    if (this.hasAttribute('breakpoint')) {
      const style = this.shadowRoot.querySelector('style');
      style.innerHTML += `
        @media (max-width: ${this.getAttribute('breakpoint')}) {
            .scrolljack__container--outer {
                height: fit-content !important;    
            }
        }
      `;
    }
  }
}

customElements.define('est-scrolljack', EstScrolljack);
