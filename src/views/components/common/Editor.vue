<!-- =========================================================================================
    File Name: Edutir.vue
    Description: ckEditor 컴포넌트 [reusable 컴포넌트]
    ----------------------------------------------------------------------------------------
    Props: 
      - contents: '수정' 시, 에디터에 세팅해 놓을 기존 내용 ==> html 형태 or 그냥 텍스트
    
    Action:
      - inputHandler: 에디터의 내용이 변경될 때마다 (입력 or 수정), 사용하는 곳에서 value 업데이트 하는 함수
========================================================================================== -->

<template>
  <div id="Editor">
    <ckeditor 
      :editor="editor" 
      :config="editorConfig"
      :value="contents"
      @input="updateContents($event)"
    ></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import UnderlinePlugin from '@ckeditor/ckeditor5-basic-styles/src/underline';
import StrikethroughPlugin from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import AlignmentPlugin from '@ckeditor/ckeditor5-alignment/src/alignment';
import Font from '@ckeditor/ckeditor5-font/src/font';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import Table from '@ckeditor/ckeditor5-table/src/table';
import List from '@ckeditor/ckeditor5-list/src/list';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';

export default {
  props: ['contents'],
  methods: {
    updateContents($event) {
      this.$emit('inputHandler', $event)
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        placeholder: "내용을 입력해주세요.",
        plugins: [
            EssentialsPlugin,
            BoldPlugin,
            ItalicPlugin,
            UnderlinePlugin,
            StrikethroughPlugin,
            LinkPlugin,
            AlignmentPlugin,
            ParagraphPlugin,
            Font,
            FontSize,
            FontFamily,
            FontBackgroundColor,
            Table,
            List,
            PasteFromOffice,
        ],
        toolbar: {
            items: [
                "fontFamily", 'fontSize', "bold", "italic", "underline", "strikethrough", "fontColor", 
                "fontbackgroundcolor", "link", 'alignment', "numberedList", "bulletedList", "|", "insertTable", "tableColumn", "tableRow", 
                "mergeTableCells", "undo", "redo", 
            ],
        },
        fontFamily:{
            options: [
                'AppleSDGothicNeo, gothic',
                'GmarketSans, sans-serif',
                'Arial, Helvetica, sans-serif',
                'Times New Roman, Times, serif',
            ]
        },
        fontSize:{
            options:['default', 9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 25, 30, 35]
        }
      },
    }
  }
}
</script>