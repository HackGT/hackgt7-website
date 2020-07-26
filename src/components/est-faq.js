import {fetchCms} from '../cms.js';

const query = `
{
    allFAQs {
        question
        answer
    }
}`;

/**
 * Class representing the est-faq custom element
 *
 * @example
 * <div>
 *    <!-- This will fetch FAQs from CMS, and generate HTML from it -->
 *    <est-faq></est-faq>
 * </div>
 *
 */
class EstFaq extends HTMLElement {
  /**
   * Fetches FAQs from CMS, and generates HTML by invoking `_genHTML()`
   */
  constructor() {
    super();

    fetchCms(query)
        .then(
          (data) => this._genHtml(data.allFAQs)          
        )
  }

  /**
   * @typedef {Object} Faq
   * @property {String} question
   * @property {String} answer
   */

  /**
   * Generates HTML from Faqs
   * @param {Faq[]} faqs - The list of faqs for which HTML is to be generated
   */
  _genHtml(faqs) {
    this.faqs = faqs;
    const container = document.createElement('div');
    container.classList.add('est-faq');

    this.faqs.forEach((faq) => {
      const faqContainer = document.createElement('div');
      faqContainer.classList.add('est-faq__container');

      const question = document.createElement('div');
      question.innerHTML = faq.question;
      question.classList.add('est-faq__container__item');
      question.classList.add('est-faq__container__item--question');

      question.addEventListener('click', () => {
        question.classList.toggle('est-faq__container__item--question--active');
        const answer = question.nextElementSibling;
        if (answer.style.maxHeight) {
          answer.style.maxHeight = null;
        } else {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
        answer.classList.toggle('est-faq__container__item--answer--active');
      });

      const answer = document.createElement('div');
      const answerText = document.createElement('p');
      answerText.innerHTML = faq.answer;
      answer.appendChild(answerText);
      answer.classList.add('est-faq__container__item');
      answer.classList.add('est-faq__container__item--answer');

      faqContainer.appendChild(question);
      faqContainer.appendChild(answer);

      container.appendChild(faqContainer);
    });
    this.appendChild(container);
  }
}

customElements.define('est-faq', EstFaq);
