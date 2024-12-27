<template>
  <div>
    <n-config-provider :theme-overrides="getThemeOverrides" :locale="locale">
      <n-message-provider>
        <n-modal-provider>
          <slot />
        </n-modal-provider>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue'
  defineComponent({
    name: 'DefaultLayout'
  })
  const locale = {
    name: 'ja-JP',
    global: {
      undo: '元に戻す',
      redo: 'やり直す',
      confirm: '確認',
      clear: 'クリア'
    },
    Popconfirm: {
      positiveText: 'はい',
      negativeText: 'いいえ'
    },
    Cascader: {
      placeholder: '選択してください',
      loading: '読み込み中',
      loadingRequiredMessage: (label: string) => `${label}を読み込んでください`
    },
    DatePicker: {
      yearFormat: 'yyyy年',
      monthFormat: 'MM月',
      dayFormat: 'dd日',
      yearTypeFormat: 'yyyy年',
      monthTypeFormat: 'yyyy-MM',
      dateFormat: 'yyyy/MM/dd',
      dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
      quarterFormat: 'yyyy年第Q季度',
      weekFormat: 'yyyy年第WW週',
      today: '今日',
      now: '現在',
      confirm: '確認',
      selectDate: '日付を選択してください',
      selectTime: '時間を選択してください',
      selectDateTime: '日時を選択してください',
      startPlaceholder: '開始日付',
      endPlaceholder: '終了日付',
      monthBeforeYear: false,
      firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
      clear: 'クリア',
      datePlaceholder: '日付',
      datetimePlaceholder: '日時を選択してください',
      monthPlaceholder: '月を選択してください',
      yearPlaceholder: '年を選択してください',
      quarterPlaceholder: '四半期を選択してください',
      startDatePlaceholder: '開始日付',
      endDatePlaceholder: '終了日付',
      startDatetimePlaceholder: '開始日時',
      endDatetimePlaceholder: '終了日時',
      weekPlaceholder: '123',
      startMonthPlaceholder: '123',
      endMonthPlaceholder: '123'
    },
    TimePicker: {
      placeholder: '時間を選択してください',
      positiveText: '確認',
      negativeText: 'キャンセル',
      now: '現在',
      clear: 'クリア'
    },
    Input: {
      placeholder: '入力してください'
    },
    InputNumber: {
      placeholder: '入力してください'
    },
    DynamicInput: {
      create: '作成'
    },
    ThemeEditor: {
      title: 'テーマエディター',
      clearAllVars: 'すべての変数をクリア',
      clearSearch: '検索をクリア',
      filterCompName: 'コンポーネント名をフィルタリング',
      filterVarName: '変数名をフィルタリング',
      import: 'インポート',
      export: 'エクスポート',
      restore: 'デフォルトに戻す'
    },
    Pagination: {
      goto: '移動',
      selectionSuffix: 'ページ'
    },
    Table: {
      empty: 'データがありません'
    },
    Select: {
      placeholder: '選択してください'
    },
    TreeSelect: {
      placeholder: '選択してください'
    },
    Transfer: {
      sourceTitle: 'ソース',
      targetTitle: 'ターゲット',
      selectAll: 'すべて選択',
      unselectAll: 'すべて選択解除',
      clearAll: 'すべてクリア',
      total: (num: number) => `合計 ${num} 件`,
      selected: (num: number) => `${num} 件選択済み`
    },
    Empty: {
      description: 'データがありません'
    },
    Image: {
      error: '読み込み失敗',
      tipPrevious: '前へ',
      tipNext: '次へ',
      tipCounterclockwise: '反時計回り',
      tipClockwise: '時計回り',
      tipZoomOut: '縮小',
      tipZoomIn: '拡大',
      tipDownload: 'ダウンロード',
      tipClose: '閉じる',
      tipOriginalSize: '元のサイズ'
    },
    Time: {
      dateFormat: 'yyyy/MM/dd',
      dateTimeFormat: 'yyyy/MM/dd HH:mm:ss',
      clear: 'クリア',
      now: '現在',
      confirm: '確認',
      selectTime: '時間を選択してください',
      selectDate: '日付を選択してください',
      selectDateTime: '日時を選択してください',
      startPlaceholder: '開始時間',
      endPlaceholder: '終了時間'
    },
    DataTable: {
      empty: 'データがありません',
      checkTableAll: 'すべて選択',
      uncheckTableAll: 'すべて選択解除',
      confirm: '確認',
      clear: 'クリア'
    },
    LegacyTransfer: {
      sourceTitle: 'ソース',
      targetTitle: 'ターゲット'
    },
    DynamicTags: {
      add: '追加'
    },
    Log: {
      loading: '読み込み中'
    },
    Calendar: {
      yearFormat: 'yyyy年',
      monthFormat: 'MM月',
      dayFormat: 'dd日',
      yearTypeFormat: 'yyyy年',
      monthTypeFormat: 'yyyy-MM',
      dateFormat: 'yyyy/MM/dd',
      dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
      quarterFormat: 'yyyy年第Q季度',
      weekFormat: 'yyyy年第WW週',
      today: '今日',
      now: '現在',
      confirm: '確認',
      selectDate: '日付を選択してください',
      selectTime: '時間を選択してください',
      selectDateTime: '日時を選択してください',
      startPlaceholder: '開始日付',
      endPlaceholder: '終了日付',
      monthBeforeYear: false,
      firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
      clear: 'クリア',
      datePlaceholder: '日付',
      datetimePlaceholder: '日時を選択してください',
      monthPlaceholder: '月を選択してください',
      yearPlaceholder: '年を選択してください',
      quarterPlaceholder: '四半期を選択してください',
      startDatePlaceholder: '開始日付',
      endDatePlaceholder: '終了日付',
      startDatetimePlaceholder: '開始日時',
      endDatetimePlaceholder: '終了日時',
      weekPlaceholder: '123',
      startMonthPlaceholder: '123',
      endMonthPlaceholder: '123'
    }
  }
  const appTheme = '#3799DC'
  const getThemeOverrides = {
    common: {
      primaryColor: appTheme,
      primaryColorHover: appTheme,
      primaryColorPressed: appTheme,
      primaryColorSuppl: appTheme,
      boxShadowFocus: 'none'
    },
    LoadingBar: {
      colorLoading: appTheme
    },
    Menu: {
      itemTextColor: '#5B5B5B', // Text khi không active
      itemTextColorActive: '#181818', // Text khi active
      itemIconColor: '#858D9D', // Icon khi không active
      itemIconColorActive: '#3799DC', // Icon khi active,
      itemIconColorHover: '#3799DC', // Icon khi active,
      itemColorActive: '#fff', // Background khi active
      itemColorActiveHover: '#fff', // Background active khi hover
      itemTextColorActiveHover: '#181818', // Text active khi hover
      itemColorHover: '#fff', // Background khi hover
      itemTextColorChildActive: '#5B5B5B',
      itemIconColorChildActive: '#5B5B5B',
      itemTextColorChildActiveHover: '#181818',
      arrowColorChildActiveHover: '#858d9d',
      arrowColorChildActive: '#858d9d'
    },
    Input: {
      border: '1px solid #D1D1D1', // Màu viền khi focus
      borderFocus: '1px solid #4F4F4F',
      borderHover: '1px solid #4F4F4F',
      boxShadowFocus: '0 0 0 2px rgba(79, 70, 1, 0)', // Hiệu ứng đổ bóng khi focus
      borderError: '#ED584F'
    },
    Select: {
      peers: {
        InternalSelection: {
          borderRadius: '8px',
          border: '1px solid #D1D1D1',
          borderHover: '1px solid #D1D1D1',
          borderFocus: '1px solid #D1D1D1',
          borderActive: '1px solid #D1D1D1',
          boxShadowActive: '0 0 4px rgba(0, 0, 0, 0.25)',
          boxShadowFocus: '0 0 4px rgba(0, 0, 0, 0.25'
        },
        InternalSelectMenu: {
          optionTextColorActive: '#4F4F4F',
          optionCheckColor: '#858D9D',
          borderRadius: '0px'
        }
      }
    }
  }
</script>
