const cluster = require("cluster");
const os = require("os");

// ****

const numberOfUsersInDB = () => {
  this.count = this.count || 5;
  this.count = this.count * this.count;
  return this.count;
};

// ****

if (cluster.isMaster) {
  const cpus = os.cpus().length;

  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  console.log(`Master PID: ${process.pid}`);

  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.id} crached. ` + `Starting a new worker...`);
      cluster.fork();
    }
  });

  process.on("SIGUSR2", () => {
    const workers = Object.values(cluster.workers);

    const restartWorker = (workerIndex) => {
      const worker = workers[workerIndex];
      if (!worker) return;

      worker.on("exit", () => {
        if (!worker.exitedAfterDisconnect) return;
        console.log(`Exited process ${worker.process.pid}`);
        cluster.fork().on("listening", () => {
          restartWorker(workerIndex + 1);
        });
      });
      worker.disconnect();
    };
  });

  const updateWorkers = () => {
    const usersCount = numberOfUsersInDB();
    //   console.dir(cluster.workers, { depth: 0 });
    Object.values(cluster.workers).forEach((worker) => {
      worker.send({ usersCount });
    });
  };
  updateWorkers();
  setInterval(updateWorkers, 10000);
} else {
  require("./http_loadbalance");
}
