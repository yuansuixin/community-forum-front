<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a
        :class="{ 'layui-this': status === '' && tag === '' }"
        @click.prevent="search()"
        >综合</a
      >
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '0' }" @click.prevent="search(0)"
        >未结</a
      >
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '1' }" @click.prevent="search(1)"
        >已结</a
      >
      <span class="fly-mid"></span>
      <a
        :class="{ 'layui-this': status === '' && tag === '精华' }"
        @click.prevent="search(2)"
        >精华</a
      >
      <span class="fly-filter-right layui-hide-xs">
        <a
          :class="{ 'layui-this': sort === 'created' }"
          @click.prevent="search(3)"
          >按最新</a
        >
        <span class="fly-mid"></span>
        <a
          :class="{ 'layui-this': sort === 'answer' }"
          @click.prevent="search(4)"
          >按热议</a
        >
      </span>
    </div>
    <list-item :lists="lists" @nextpage="nextPage()"></list-item>
  </div>
</template>
<script>
import { getList } from '@/api/content'
import ListItem from './ListItem'
export default {
  name: 'list',
  data() {
    return {
      isEnd: false,
      status: '',
      isRepeat: false,
      current: '',
      tag: '',
      sort: '',
      page: 0,
      limit: 20,
      catalog: '',
      lists: []
    }
  },
  components: {
    ListItem
  },
  mounted() {
    const catalog = this.$route.params.catalog
    if (typeof catalog !== 'undefined' && catalog !== '') {
      this.catalog = catalog
    }
    this._getLists()
  },
  watch: {
    current(newval, oldval) {
      console.log('current -> oldval', oldval)
      console.log('current -> newval', newval)
      this.init()
    },
    '$route'(newval, oldval) {
      const catalog = newval.params.catalog
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this.init()
    }
  },
  methods: {
    init() {
      this.page = 0
      this.isEnd = false
      this.lists = []
      this._getLists()
    },
    _getLists() {
      if (this.isRepeat) return
      if (this.isEnd) return
      this.isRepeat = true
      const options = {
        catalog: this.catalog,
        isTop: 0,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }
      getList(options)
        .then(res => {
          // 加入一个请求锁，防止用户多次点击，等待数据返回后，再打开
          this.isRepeat = false
          console.log('_getLists -> res', res)
          // 对于异常的判断
          // 判断是否lists长度为0，如果为零可以直接赋值
          // 当lists长度不为0，后面请求的数据，加入到lists里面来
          if (res.code === 200) {
            if (res.data.length < this.limit) {
              this.isEnd = true
            }
            if (this.lists.length === 0) {
              this.lists = res.data
            } else {
              this.lists = this.lists.concat(res.data)
            }
          }
        })
        .catch(err => {
          this.isRepeat = false
          if (err) {
            this.$alert(err.msg)
          }
        })
    },
    nextPage() {
      this.page++
      this._getLists()
    },
    search(val) {
      if (typeof val === 'undefined' && this.current === '') return
      this.current = val
      switch (val) {
        // 未结帖
        case 0:
          this.status = '0'
          this.tag = ''
          break
        // 已结贴
        case 1:
          this.status = '1'
          this.tag = ''
          break
        // 查询精华
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        // 按照时间查询
        case 3:
          this.sort = 'created'
          break
        // 按照评论数查询
        case 4:
          this.sort = 'answer'
          break
        // 综合查询
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
      }
    }
  }
}
</script>
