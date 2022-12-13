import {
  Module,
  customModule,
  customElements,
  ControlElement,
  Control,
  Styles,
  Input,
  Upload,
  Markdown,
  IComboItem,
  ComboBox,
  Table,
  Icon,
  Modal,
  Label
} from '@ijstech/components';
import { IConfig } from '@modules/interface';
import { textareaStyle } from './index.css';

const Theme = Styles.Theme.ThemeVars;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['commission-claim-config']: ControlElement;
    }
  }
}

@customModule
@customElements("commission-claim-config")
export default class Config extends Module {
  private uploadLogo: Upload;
  private edtDescription: Input;
  private markdownViewer: Markdown;
  private _logo: any;

  async init() {
    super.init();
  }

  get data(): IConfig {
    const config: IConfig = {
      description: this.edtDescription.value || ""
    };
    if (this._logo) {
      config.logo = this._logo;
    }
    return config;
  }

  set data(config: IConfig) {
    this.uploadLogo.clear();
    if (config.logo) {
      this.uploadLogo.preview(config.logo);
    }
    this._logo = config.logo;
    this.edtDescription.value = config.description || "";
    this.onMarkdownChanged();
  }

  async onChangeFile(source: Control, files: File[]) {
    this._logo = files.length ? await this.uploadLogo.toBase64(files[0]) : undefined;
  }

  onRemove(source: Control, file: File) {
    this._logo = undefined;
  }

  onMarkdownChanged() {
    this.markdownViewer.load(this.edtDescription.value || "");
  }

  render() {
    return (
      <i-vstack gap='0.5rem' padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}>
        <i-label caption='Logo:'></i-label>
        <i-upload
          id='uploadLogo'
          margin={{ top: 8, bottom: 0 }}
          accept='image/*'
          draggable
          caption='Drag and drop image here'
          showFileList={false}
          onChanged={this.onChangeFile.bind(this)}
          onRemoved={this.onRemove.bind(this)}
        ></i-upload>
        <i-label caption='Descriptions:'></i-label>
        <i-grid-layout
          templateColumns={['50%', '50%']}
        >
          <i-input
            id='edtDescription'
            class={textareaStyle}
            width='100%'
            height='100%'
            display='flex'
            stack={{ grow: '1' }}
            resize="none"
            inputType='textarea'
            font={{ size: Theme.typography.fontSize, name: Theme.typography.fontFamily }}
            onChanged={this.onMarkdownChanged.bind(this)}
          ></i-input>
          <i-markdown
            id='markdownViewer'
            width='100%'
            height='100%'
            padding={{ top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }}
          ></i-markdown>
        </i-grid-layout>
      </i-vstack>
    )
  }
}