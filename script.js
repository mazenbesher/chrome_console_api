let countHandlersAdded = false

const {
    assert,
    clear,
    count,
    dir,
    log, debug, info, error, warn,
    group, groupCollapsed, groupEnd,
    profile, profileEnd,
    time, timeEnd, timeStamp,
    trace,
    table } = console


function main() {
    // generate console api
    const weirdLinks = {
        debug: 'consoledebugobject_object',
        dirxml: 'consoledirxmlobject',
        groupCollapsed: 'consolegroupcollapsedobject_object',
        info: 'consoleinfoobject_object'
    }
    
    
    const mdn = {
        table: 'https://developer.mozilla.org/en-US/docs/Web/API/Console/table'
    }

    Object.keys(console).forEach(cmd => {
        /**
         * Results 24.08.2017:
         * [  
         *    "debug",  "error",  "info",  "log",  "warn",  "dir",  "dirxml",  
         *    "table",  "trace",  "group",  "groupCollapsed",  "groupEnd",  
         *    "clear",  "count",  "assert",  "markTimeline",  "profile",  
         *    "profileEnd",  "timeline",  "timelineEnd",  "time",  "timeEnd",  
         *    "timeStamp",  "memory"
         * ]
         */

        // bottom
        const btn = document.createElement('button')
        btn.className = 'btn btn-outline-primary' // assumes bootstrap
        btn.addEventListener('click', e => explain(cmd, e))
        btn.innerText = `${cmd} `

        // api links
        const a = document.createElement('a')
        btn.appendChild(a)
        a.target = '_blank'
        a.innerText = '🛈'

        // a.href
        if (Object.keys(mdn).indexOf(cmd) != -1) {
            // MDN API
            a.href = mdn[cmd]
        } else {
            // Chrome API
            const tag = weirdLinks[cmd] ? weirdLinks[cmd] : cmd.toLowerCase()
            a.href = `https://developers.google.com/web/tools/chrome-devtools/console/console-reference#${tag}`
        }

        document.getElementById('container').appendChild(btn)
    })

    // table all commands at the start
    let allCommands = []
    Object.keys(console).map(command => allCommands.push({ command }))
    log('all commands in console object:')
    table(allCommands)
}

function doTask() {
    let arr = new Array(10000);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Object();
    }
}

function explain(what, e) {
    clear()

    const me = { first: 'mazen', last: 'besher' }
    const you = { first: 'tiny', last: 'me' }
    const logObj = p => Object.keys(p).forEach(k => log(`${k}: `, p[k]))
    const compareCss = 'font-weight: bold; font-size: 2em;'

    switch (what) {
        case 'assert':
            assert(1 == 2, {
                message: "they must be equal"
            })
            break

        case 'clear':
            console.log('clears the console')
            break

        case 'count':
            log('note clearing the console reset the count')
            log('count clicks on the appended A and B buttons!')
            if (countHandlersAdded) return;

            // Add A and B
            const btnLetters = ['A', 'B']
            for (const letter of btnLetters) {
                const btn = document.createElement('button')
                btn.addEventListener('click', e => count(letter))
                btn.innerText = letter
                btn.className = 'btn btn-outline-danger'
                e.target.insertAdjacentElement('afterend', btn)
            }
            countHandlersAdded = !countHandlersAdded

            break

        case 'dir':
            log('prints js representation of the element, %ccompare:', compareCss)
            log(document)
            dir(document)
            break

        case 'info':
        case 'warn':
        case 'error':
        case 'debug':
        case 'log':
            log('%ccompare:', compareCss)
            log('%cNote: %cto see all types disable any filter!', 'font-weight: bold', 'font-weight: normal')
            log('log')
            debug('debug == log')
            error('error')
            info('info')
            warn('warn')
            break

        case 'group':
        case 'groupEnd':
            group('me')
            logObj(me)
            group('inside me is you')
            logObj(you)
            groupEnd()
            groupEnd()
            break

        case 'groupCollapsed':
            groupCollapsed('me')
            logObj(me)
            groupCollapsed('inside me is you')
            logObj(you)
            groupEnd()
            groupEnd()
            break

        case 'profile':
        case 'profileEnd':
            log('Starts a JavaScript CPU profile with an optional label')
            profile('doing a task :P')
            doTask()
            profileEnd()
            console.log('see JavaScript Profiler tab for results');
            break

        case 'time':
        case 'timeEnd':
            log('Starts a new timer.')
            log('Pass an optional label to change the output text that precedes the elapsed time.')
            log('Use labels to run multiple timers at the same time')

            const label = 'timing the important task'
            time(label)
            doTask()
            timeEnd(label)
            break

        case 'timeStamp':
            log('Adds an event to the Timeline during a recording session')
            timeStamp('check out this custom timestamp thanks to console.timeStamp()!')
            break

        case 'trace':
            log('Prints a stack trace from the point where the method was called.')
            trace('from here on!!!')
            break

        case 'table':
            // an array of strings
            const fruits = ["apples", "oranges", "bananas"]
            groupCollapsed('tabling an array of strings:', fruits)
            table(fruits)
            groupEnd()

            // nested arrays
            const people = [["John", "Smith"], ["Jane", "Doe"], ["Emily", "Jones"]]
            groupCollapsed('tabling nested arrays:', people)
            table(people)
            groupEnd()

            // an object whose properties are strings
            groupCollapsed('tabling an object whose properties are strings:', me)
            table(me)
            groupEnd()

            // an array of objects
            function Person(firstName, lastName) {
                this.firstName = firstName;
                this.lastName = lastName;
            }

            let john = new Person("John", "Smith");
            let jane = new Person("Jane", "Doe");
            let emily = new Person("Emily", "Jones");

            const people2 = [john, jane, emily]
            groupCollapsed('tabling an array of objects:', people2)
            table(people2)
            groupEnd()

            // an array of objects, logging only firstName
            groupCollapsed('tabling an array of objects, logging only firstName:', people2)
            table(people2, ['firstName'])
            groupEnd()

            break

        default:
            log(`example for ${what} are not provided yet!`)
            break
    }
}

window.onload = main