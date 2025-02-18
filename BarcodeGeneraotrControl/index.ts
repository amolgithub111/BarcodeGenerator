import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as JsBarcode from "jsbarcode";

export class BarcodeGeneraotrControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;

    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.container = container;
        this.container.style.overflow = "auto";
        this.generateBarcode("Barcode_Gen_12_(01/01/2025)",2,60,14,"true");
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Add code to update control view
        // Update the barcode value based on the context
        const barcodeValue = context.parameters.barcodeTextInputProperty.raw || "123456789012";
        const barWidth = context.parameters.barWidthNumberInputProperty.raw || 10;
        const barHeight = context.parameters.barHeightNumberInputProperty.raw || 20;
        const fontSize = context.parameters.fontSizeInputProperty.raw || 8;
        const showText = context.parameters.showTextInputProperty.raw || "true";
        this.generateBarcode(barcodeValue,barWidth,barHeight,fontSize,showText);
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
    /**
     * Generates a barcode and appends it to the container.
     * @param value The value to encode in the barcode.
     */
    private generateBarcode(value: string,barWidth: number,barHeight: number,fontSize: number,showText: string): void {
        // Clear the container
        this.container.innerHTML = "";

        // Create an SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.container.appendChild(svg);

        // Generate the barcode
        JsBarcode(svg, value, {
            format: "CODE128",
            displayValue: showText === "true"?true:false,
            width: barWidth,
            height: barHeight,
            fontSize: fontSize
        });
    }
}
