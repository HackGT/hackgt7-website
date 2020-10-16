import { fetchCms } from "../cms.js";
import moment from "moment";

const query = `
{
  allEvents (where: { hackathon: { name: "HackGT 7" } }) {
    name
    startDate
  }
}
`;

const template = document.createElement("template");
template.innerHTML = `
<est-select class="est-schedule__select"></est-select>
`;

/**
 * TODO
 */
class EstSchedule extends HTMLElement {
    /**
     * @constructor
     */
    constructor() {
        super();

        const container = template.content.cloneNode(true);
        this.appendChild(container);

        this.currentEvent = null;
        this.daily = new Map();
        this._current = null; // backing property
    }

    /**
     * TODO
     */
    connectedCallback() {
        fetchCms(query)
            .then(data => {
                this._genHtml(data.allEvents);
            })
            .catch(err => console.error(err));
    }

    /**
     * TODO
     * @param {Object} events
     */
    _genHtml(events) {
        this.events = events
            .map(e => {
                console.log(moment(e.startDate))
                return {
                    name: e.name,
                    startDate: moment(e.startDate).add(4,"h")
                };
            })
            .sort((a, b) => a.startDate - b.startDate);
        
        
        
        this.events.forEach(e => {
            const day = e.startDate.format("dddd");
            let l = this.daily.get(day);
            if (!l) {
                l = [e];
            } else {
                l.push(e);
            }
            this.daily.set(day, l);
        });

        window.e = this.events;

        const optionsContainer = this.querySelector(".est-schedule__select");
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("est-schedule__days");

        for (const day of this.daily.keys()) {
            // events
            const btn = document.createElement("button");
            btn.classList.add("est-schedule__days__btn");
            btn.setAttribute("day", day);
            btn.innerHTML = day;

            btn.addEventListener("click", () => {
                this.current = {
                    events: this.querySelector(`div[day="${day}"]`),
                    btn: btn
                };
                optionsContainer.selectOption(day);
            });

            btnContainer.appendChild(btn);
            optionsContainer.addOption(day);
        }

        this.appendChild(btnContainer);
        const outerContainer = document.createElement("div");
        outerContainer.classList.add("est-schedule__events-container");
        for (const [day, events] of this.daily.entries()) {
            // add events
            const eventsContainer = document.createElement("div");
            eventsContainer.setAttribute("day", day);
            eventsContainer.classList.add("est-schedule__events");
            eventsContainer.classList.add("est-schedule__events--hidden");

            for (const event of events) {
                const timeDiv = document.createElement("div");
                timeDiv.classList.add("est-schedule__events__item");
                timeDiv.classList.add("est-schedule__events__item--time");
                timeDiv.innerHTML = event.startDate.format("hh:mm a");

                const eventDiv = document.createElement("div");
                eventDiv.classList.add("est-schedule__events__item");
                eventDiv.classList.add("est-schedule__events__item--event");
                eventDiv.innerHTML = event.name;

                eventsContainer.appendChild(timeDiv);
                eventsContainer.appendChild(eventDiv);
            }

            outerContainer.appendChild(eventsContainer);
        }

        this.appendChild(outerContainer);

        const firstDay = this.daily.keys().next().value;
        this.current = {
            events: this.querySelector(`div[day="${firstDay}"]`),
            btn: this.querySelector(".est-schedule__days").firstChild
        };
        optionsContainer.addEventListener("change", () => {
            this.current = {
                events: this.querySelector(
                    `div[day="${optionsContainer.current.innerHTML}"]`
                ),
                btn: this.querySelector(
                    `button[day="${optionsContainer.current.innerHTML}"]`
                )
            };
        });
        optionsContainer.selectOption(firstDay);
    }

    /**
     * TODO
     * @param {Object} dateString
     * @return {string}
     */
    _resolveStartDay(day) {
        const d = new Date(dateString);
        console.log(d.toUTCString());
        switch (d.getDay()) {
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
        }
    }

    /**
     * TODO
     */
    get current() {
        return this._current;
    }

    /**
     * TODO
     * @param {Object} val
     */
    set current(val) {
        if (!val) return;
        const eventsClass = "est-schedule__events--hidden";
        const btnClass = "est-schedule__days__btn--active";

        if (!this._current) {
            this._current = val;

            this._current.events.classList.remove(eventsClass); // unhide old events
            this._current.btn.classList.add(btnClass); // highlight new btn
        } else {
            this._current.events.classList.add(eventsClass); // hide old events
            this._current.btn.classList.remove(btnClass); // unhighlight old btn

            this._current = val;

            this._current.events.classList.remove(eventsClass); // unhide new events
            this._current.btn.classList.add(btnClass); // highlight new btn
        }
    }
}

customElements.define("est-schedule", EstSchedule);
