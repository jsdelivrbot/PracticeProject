from celery import Celery
import subprocess, multiprocessing


class CeleryModule(Celery):
    def __init__(self, app):
        Celery.__init__(self, 'app',
                         backend=app.config['CELERY_RESULT_BACKEND'],
                         broker=app.config['CELERY_BROKER_URL'])
        self.make_celery(app)
        self.process = self.make_celery_processing()

    def make_celery(self, app):
        self.conf.update(app.config)
        TaskBase = self.Task

        class ContextTask(TaskBase):
            abstract = True
            def __call__(self, *args, **kwargs):
                with app.app_context():
                    return TaskBase.__call__(self, *args, **kwargs)
        self.Task = ContextTask

    def start_celery_command(self):
        command_text = "celery worker -A app.celery --loglevel=info"
        subprocess.call(command_text, shell=True)

    def make_celery_processing(self):
        celery_process = multiprocessing.Process(target=self.start_celery_command)
        return celery_process

    def process_start(self):
        self.process.start()
