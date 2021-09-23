 new Vue({
        el: "#app",
        data() {
          return {
            list: null,
            addText: "",
            pre_time: "900",
            time_now: "",
            is_timing: false,
            timer: null,
            now_id: null,
          };
        },
        computed: {
          getHour() {
            return this.time_now
              ? this.time_now > 3600
                ? Math.floor((this.time_now / 3600) % 60)
                : "00"
              : "00";
          },
          getMin() {
            return this.time_now
              ? this.time_now > 60
                ? Math.floor((this.time_now / 60) % 60)
                : "00"
              : "00";
          },
          getSec() {
            return this.time_now ? this.time_now % 60 : "00";
          },
          timerStyle() {
            return this.time_now > 10
              ? "safe"
              : this.time_now >= 0
              ? "remind"
              : "wran";
          },
        },
        methods: {
          setDB() {
            localStorage.setItem("mylist", JSON.stringify(this.list));
          },
          add() {
            if (!this.addText.trim()) {
              alert("請輸入文字內容");
              this.addText = "";
              return;
            }
            let addObj = {
              id: new Date().getTime(),
              title: this.addText,
              iscompele: false,
              uesTimer: "--",
              preTimer: this.pre_time,
              start_time: "--",
              end_time: "--",
              break_count: 0,
              break: [],
            };
            this.list.push(addObj);
            this.setDB();
            this.addText = "";
          },
          pre_start(time) {
            this.time_now = time.time;
            this.now_id = time.id;
          },
          pause() {
            clearInterval(this.timer);
            this.timer = null;
            if (this.is_timing) {
              this.list.forEach((item) => {
                if (item.id === this.now_id) {
                  item.break_count++;
                  item.break.push(new Date().toLocaleString().slice(0, -3));
                }
              });
            }
            this.setDB();
          },
          start() {
            if (!this.now_id) return;
            if (!this.is_timing) {
              this.list.forEach((item) => {
                if (item.id === this.now_id) {
                  item.start_time = new Date().toLocaleString().slice(0, -3);
                }
              });
            }
            this.is_timing = true;
            this.timer = setInterval(() => {
              --this.time_now;
            }, 1000);
          },
          stop() {
            this.is_timing = false;
            this.pause();
            this.list.forEach((item) => {
              if (item.id === this.now_id) {
                item.iscompele = true;
                item.uesTimer = this.time_now;
                item.end_time = new Date().toLocaleString().slice(0, -3);
              }
            });
            this.setDB();
            this.now_id = null;
            this.time_now = "";
          },
          deleteItem(id) {
            let point = 0;
            this.list.forEach((item) => {
              if (item.id === id) {
                this.list.splice(point, 1);
              } else {
                point++;
              }
            });
            this.time_now=''
            this.setDB();
          },
          reset_pre_start(id) {
            clearInterval(this.timer);
            this.list.forEach((item) => {
              if (item.id === id) {
                (item.uesTimer = "--"),
                  (item.start_time = "--"),
                  (item.end_time = "--"),
                  (item.break_count = 0),
                  (item.break = []);
              }
            });
            this.now_id = null;
            this.time_now = "";
            this.is_timing = false;
            this.setDB();
          },
        },
        mounted() {
          this.list = JSON.parse(localStorage.getItem("mylist")) || [];
        },
      });