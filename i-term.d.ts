import {
    AppleAppKey,
    JXAApplication,
    JXAArraySpecifier,
    JXABoolean,
    JXAInteger,
    JXANumber,
    JXARecord,
    JXASpecifier,
    JXAText,
    JXAReal,
    JXAType,
    JXADate,
    JXALocationSpecifier,
    JXAFile,
    JXAProperty,
    JXARGBColor,
    JXAPoint,
    JXARectangle,
    JXARectangleValue,
    JXAList,
    JXAItem,
    ObjectSpecifierConstructor,
    EachElementsType,
    RespondsTo,
} from "@apple-jxa/types";

export namespace ITerm {
    /**
     * Common classes and commands for all applications.
     */
    export namespace StandardSuite {

        /**
         * The application's top-level scripting object.
         */
        export interface Application extends JXAApplication {
            /**
             * Return the number of elements of a particular class within an object.
             * @param directParameter the object whose elements are to be counted
             * @param option each: The class of objects to be counted. 
             */
            count<T extends JXASpecifier>(directParameter: T, option?: { each?: JXAType<EachElementsType<T>> }): number

            /**
             * Delete an object.
             * @param directParameter the object to delete
             */
            delete(directParameter: JXASpecifier): void

            /**
             * Copy object(s) and put the copies at a new location.
             * @param directParameter the object(s) to duplicate
             * @param option to: The location for the new object(s). ;withProperties: Properties to be set in the new duplicated object(s). 
             */
            duplicate(directParameter: JXASpecifier, option: { to: JXALocationSpecifier, withProperties?: JXARecord }): void

            /**
             * Verify if an object exists.
             * @param directParameter the object in question
             */
            exists(directParameter: JXASpecifier): boolean

            /**
             * Make a new object.
             * @param option new: The class of the new object. ;at: The location at which to insert the object. ;withData: The initial contents of the object. ;withProperties: The initial values for properties of the object. 
             */
            make<T extends JXASpecifier>(option: { new: JXAType<T>, at?: JXALocationSpecifier, withData?: any, withProperties?: JXARecord<T> }): JXASpecifier

            /**
             * Move object(s) to a new location.
             * @param directParameter the object(s) to move
             * @param option to: The new location for the object(s). 
             */
            move(directParameter: JXASpecifier, option: { to: JXALocationSpecifier }): void

            /**
             * The frontmost window
             */
            get currentWindow(): StandardSuite.Window
            set currentWindow(currentWindow: StandardSuite.Window)
            /**
             * The name of the application.
             */
            name: JXAText
            /**
             * Is this the frontmost (active) application?
             */
            frontmost: JXABoolean
            /**
             * The version of the application.
             */
            version: JXAText
            windows: JXAArraySpecifier<StandardSuite.Window>
            Window: ObjectSpecifierConstructor<Window>
        }

        /**
         * A window.
         */
        export interface Window extends JXASpecifier<'window'>, RespondsTo<Application, 'close' | 'select' | 'createTabWithDefaultProfile' | 'createTab' | 'revealHotkeyWindow' | 'hideHotkeyWindow' | 'toggleHotkeyWindow'> {
            /**
             * The unique identifier of the session.
             */
            id: JXAInteger
            /**
             * The alternate unique identifier of the session.
             */
            alternateIdentifier: JXAText
            /**
             * The full title of the window.
             */
            name: JXAText
            /**
             * The index of the window, ordered front to back.
             */
            get index(): JXAInteger
            set index(index: number)
            /**
             * The bounding rectangle of the window.
             */
            get bounds(): JXARectangle
            set bounds(bounds: JXARectangleValue)
            /**
             * Whether the window has a close box.
             */
            closeable: JXABoolean
            /**
             * Whether the window can be minimized.
             */
            miniaturizable: JXABoolean
            /**
             * Whether the window is currently minimized.
             */
            get miniaturized(): JXABoolean
            set miniaturized(miniaturized: boolean)
            /**
             * Whether the window can be resized.
             */
            resizable: JXABoolean
            /**
             * Whether the window is currently visible.
             */
            get visible(): JXABoolean
            set visible(visible: boolean)
            /**
             * Whether the window can be zoomed.
             */
            zoomable: JXABoolean
            /**
             * Whether the window is currently zoomed.
             */
            get zoomed(): JXABoolean
            set zoomed(zoomed: boolean)
            /**
             * Whether the window is currently the frontmost window.
             */
            get frontmost(): JXABoolean
            set frontmost(frontmost: boolean)
            /**
             * The currently selected tab
             */
            get currentTab(): ITerm2Suite.Tab
            set currentTab(currentTab: ITerm2Suite.Tab)
            /**
             * The current session in a window
             */
            get currentSession(): ITerm2Suite.Session
            set currentSession(currentSession: ITerm2Suite.Session)
            /**
             * Whether the window is a hotkey window.
             */
            get isHotkeyWindow(): JXABoolean
            set isHotkeyWindow(isHotkeyWindow: boolean)
            /**
             * If the window is a hotkey window, this gives the name of the profile that created the window. 
             */
            get hotkeyWindowProfile(): JXAText
            set hotkeyWindowProfile(hotkeyWindowProfile: string)
            /**
             * The position of the window, relative to the upper left corner of the screen.
             */
            get position(): JXAPoint
            set position(position: JXAPoint)
            /**
             * The position of the window, relative to the lower left corner of the screen.
             */
            get origin(): JXAPoint
            set origin(origin: JXAPoint)
            /**
             * The width and height of the window
             */
            get size(): JXAPoint
            set size(size: JXAPoint)
            /**
             * The bounding rectangle, relative to the lower left corner of the screen.
             */
            get frame(): JXARectangle
            set frame(frame: JXARectangleValue)
            tabs: JXAArraySpecifier<ITerm2Suite.Tab>
        }
    }
    /**
     * Classes just for the iTerm2 application.
     */
    export namespace ITerm2Suite {

        export interface Application extends JXASpecifier<'application'> {
            /**
             * Close a document.
             * @param directParameter the session, tab, or window to close.
             */
            close(directParameter: JXASpecifier): void

            /**
             * Request a Python API cookie
             * @param option andKeyForAppNamed: Name of script using the cookie. This is shown in the console. 
             */
            requestCookie(option?: { andKeyForAppNamed?: string }): string

            /**
             * Create a new tab
             * @param directParameter the session, tab, or window to close.
             * @param option withProfile: The profile name ;command: Shell command to run 
             */
            createTab(directParameter: JXASpecifier, option: { withProfile: string, command?: string }): ITerm2Suite.Tab

            /**
             * Create a new tab with the default profile
             * @param directParameter The window in which to create a new tab
             * @param option command: Shell command to run 
             */
            createTabWithDefaultProfile(directParameter: JXASpecifier, option?: { command?: string }): ITerm2Suite.Tab

            /**
             * Create a new window
             * @param directParameter The profile name
             * @param option command: Shell command to run 
             */
            createWindowWithProfile(directParameter: string, option?: { command?: string }): StandardSuite.Window

            /**
             * Create a hotkey window
             * @param directParameter The profile name
             */
            createHotkeyWindowWithProfile(directParameter: JXAText): StandardSuite.Window

            /**
             * Launch API script by name
             * @param directParameter The script’s name
             * @param option arguments: Arguments to pass to script 
             */
            launchApiScriptNamed(directParameter: JXAText, option?: { arguments?: string[] }): void

            /**
             * Invokes an expression, such as a registered function.
             * @param directParameter The expression to invoke, such as a function call.
             */
            invokeApiExpression(directParameter: JXAText): string

            /**
             * Create a new window with the default profile
             * @param option command: Shell command to run 
             */
            createWindowWithDefaultProfile(option?: { command?: string }): StandardSuite.Window

            /**
             * Send text as though it was typed.
             * @param directParameter The session to send to
             * @param option contentsOfFile: Filename to send the contents of ;text: Text to send ;newline: If newline should be added to end of text (default: yes) 
             */
            write(directParameter: JXASpecifier, option?: { contentsOfFile?: JXAFile, text?: string, newline?: boolean }): void

            /**
             * Make receiver visible and selected.
             * @param directParameter The object to send to
             */
            select(directParameter: JXASpecifier): void

            /**
             * Split a session vertically.
             * @param directParameter The object to send to
             * @param option withProfile: Name of profile for new session. ;command: Shell command to run 
             */
            splitVertically(directParameter: JXASpecifier, option: { withProfile: string, command?: string }): ITerm2Suite.Session

            /**
             * Split a session vertically, using the default profile for the new session
             * @param directParameter The object to send to
             * @param option command: Shell command to run 
             */
            splitVerticallyWithDefaultProfile(directParameter: JXASpecifier, option?: { command?: string }): ITerm2Suite.Session

            /**
             * Split a session vertically, using the original session's profile for the new session
             * @param directParameter The object to send to
             * @param option command: Shell command to run 
             */
            splitVerticallyWithSameProfile(directParameter: JXASpecifier, option?: { command?: string }): ITerm2Suite.Session

            /**
             * Split a session horizontally.
             * @param directParameter The object to send to
             * @param option withProfile: Name of profile for new session. ;command: Shell command to run 
             */
            splitHorizontally(directParameter: JXASpecifier, option: { withProfile: string, command?: string }): ITerm2Suite.Session

            /**
             * Split a session horizontally, using the default profile for the new session
             * @param directParameter The object to send to
             * @param option command: Shell command to run 
             */
            splitHorizontallyWithDefaultProfile(directParameter: JXASpecifier, option?: { command?: string }): ITerm2Suite.Session

            /**
             * Split a session horizontally, using the original session's profile for the new session
             * @param directParameter The object to send to
             * @param option command: Shell command to run 
             */
            splitHorizontallyWithSameProfile(directParameter: JXASpecifier, option?: { command?: string }): ITerm2Suite.Session

            /**
             * Returns the value of a session variable with the given name
             * @param directParameter The object to send to
             * @param option named: Name of variable 
             */
            variable(directParameter: JXASpecifier, option: { named: string }): string

            /**
             * Sets the value of a session variable
             * @param directParameter The object to send to
             * @param option named: Name of variable ;to: New value 
             */
            setVariable(directParameter: JXASpecifier, option: { named: string, to: string }): string

            /**
             * Reveals a hotkey window. Only to be called on windows that are hotkey windows.
             * @param directParameter The window in which to create a new tab
             */
            revealHotkeyWindow(directParameter: JXASpecifier): void

            /**
             * Hides a hotkey window. Only to be called on windows that are hotkey windows.
             * @param directParameter The window in which to create a new tab
             */
            hideHotkeyWindow(directParameter: JXASpecifier): void

            /**
             * Toggles the visibility of a hotkey window. Only to be called on windows that are hotkey windows.
             * @param directParameter The window in which to create a new tab
             */
            toggleHotkeyWindow(directParameter: JXASpecifier): void

            Tab: ObjectSpecifierConstructor<Tab>
            Session: ObjectSpecifierConstructor<Session>
        }

        /**
         * A terminal tab
         */
        export interface Tab extends JXASpecifier<'tab'>, RespondsTo<Application, 'close' | 'select'> {
            /**
             * The current session in a tab
             */
            get currentSession(): ITerm2Suite.Session
            set currentSession(currentSession: ITerm2Suite.Session)
            /**
             * Index of tab in parent tab view control
             */
            get index(): JXAInteger
            set index(index: number)
            sessions: JXAArraySpecifier<ITerm2Suite.Session>
        }

        /**
         * A terminal session
         */
        export interface Session extends JXASpecifier<'session'>, RespondsTo<Application, 'close' | 'write' | 'select' | 'splitVertically' | 'splitVerticallyWithDefaultProfile' | 'splitVerticallyWithSameProfile' | 'splitHorizontally' | 'splitHorizontallyWithDefaultProfile' | 'splitHorizontallyWithSameProfile' | 'variable' | 'setVariable'> {
            /**
             * The unique identifier of the session.
             */
            id: JXAText
            /**
             * The session has received output recently.
             */
            get isProcessing(): JXABoolean
            set isProcessing(isProcessing: boolean)
            /**
             * The terminal is at the shell prompt. Requires shell integration.
             */
            get isAtShellPrompt(): JXABoolean
            set isAtShellPrompt(isAtShellPrompt: boolean)
            get columns(): JXAInteger
            set columns(columns: number)
            get rows(): JXAInteger
            set rows(rows: number)
            tty: JXAText
            /**
             * The currently visible contents of the session.
             */
            get contents(): JXAText
            set contents(contents: string)
            /**
             * The currently visible contents of the session.
             */
            text: JXAText
            get colorPreset(): JXAText
            set colorPreset(colorPreset: string)
            get backgroundColor(): JXARGBColor
            set backgroundColor(backgroundColor: JXARGBColor)
            get boldColor(): JXARGBColor
            set boldColor(boldColor: JXARGBColor)
            get cursorColor(): JXARGBColor
            set cursorColor(cursorColor: JXARGBColor)
            get cursorTextColor(): JXARGBColor
            set cursorTextColor(cursorTextColor: JXARGBColor)
            get foregroundColor(): JXARGBColor
            set foregroundColor(foregroundColor: JXARGBColor)
            get selectedTextColor(): JXARGBColor
            set selectedTextColor(selectedTextColor: JXARGBColor)
            get selectionColor(): JXARGBColor
            set selectionColor(selectionColor: JXARGBColor)
            get ansiBlackColor(): JXARGBColor
            set ansiBlackColor(ansiBlackColor: JXARGBColor)
            get ansiRedColor(): JXARGBColor
            set ansiRedColor(ansiRedColor: JXARGBColor)
            get ansiGreenColor(): JXARGBColor
            set ansiGreenColor(ansiGreenColor: JXARGBColor)
            get ansiYellowColor(): JXARGBColor
            set ansiYellowColor(ansiYellowColor: JXARGBColor)
            get ansiBlueColor(): JXARGBColor
            set ansiBlueColor(ansiBlueColor: JXARGBColor)
            get ansiMagentaColor(): JXARGBColor
            set ansiMagentaColor(ansiMagentaColor: JXARGBColor)
            get ansiCyanColor(): JXARGBColor
            set ansiCyanColor(ansiCyanColor: JXARGBColor)
            get ansiWhiteColor(): JXARGBColor
            set ansiWhiteColor(ansiWhiteColor: JXARGBColor)
            get ansiBrightBlackColor(): JXARGBColor
            set ansiBrightBlackColor(ansiBrightBlackColor: JXARGBColor)
            get ansiBrightRedColor(): JXARGBColor
            set ansiBrightRedColor(ansiBrightRedColor: JXARGBColor)
            get ansiBrightGreenColor(): JXARGBColor
            set ansiBrightGreenColor(ansiBrightGreenColor: JXARGBColor)
            get ansiBrightYellowColor(): JXARGBColor
            set ansiBrightYellowColor(ansiBrightYellowColor: JXARGBColor)
            get ansiBrightBlueColor(): JXARGBColor
            set ansiBrightBlueColor(ansiBrightBlueColor: JXARGBColor)
            get ansiBrightMagentaColor(): JXARGBColor
            set ansiBrightMagentaColor(ansiBrightMagentaColor: JXARGBColor)
            get ansiBrightCyanColor(): JXARGBColor
            set ansiBrightCyanColor(ansiBrightCyanColor: JXARGBColor)
            get ansiBrightWhiteColor(): JXARGBColor
            set ansiBrightWhiteColor(ansiBrightWhiteColor: JXARGBColor)
            get underlineColor(): JXARGBColor
            set underlineColor(underlineColor: JXARGBColor)
            /**
             * Whether the use a dedicated color for underlining.
             */
            get useUnderlineColor(): JXABoolean
            set useUnderlineColor(useUnderlineColor: boolean)
            get backgroundImage(): JXAText
            set backgroundImage(backgroundImage: string)
            get name(): JXAText
            set name(name: string)
            get transparency(): JXAReal
            set transparency(transparency: JXAReal)
            uniqueId: JXAText
            /**
             * The session's profile name
             */
            profileName: JXAText
            /**
             * ENQ Answerback string
             */
            get answerbackString(): JXAText
            set answerbackString(answerbackString: string)
        }
    }
    export type Application = StandardSuite.Application & ITerm2Suite.Application
}
declare global {
    function Application(name: AppleAppKey<'iTerm'>): ITerm.Application;
}
