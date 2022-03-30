# from __future__ import absolute_import
# import os
# from celery import Celery
# from django.conf import settings
#
# # set the default Django settings module for the 'celery' program.
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wordle.settings')
# app = Celery('wordle')
#
# # Using a string here means the worker will not have to
# # pickle the object when using Windows.
# app.config_from_object('django.conf:settings', namespace='CELERY')
# #app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
#
# # @app.task(bind=True)
# # def debug_task(self):
# #     print('Request: {0!r}'.format(self.request))
#
# app.autodiscover_tasks()
#
# app.conf.broker_url = 'redis://localhost:6379'
#
# app.conf.beat_scheduler = 'django_celery_beat.schedulers.DatabaseScheduler'
