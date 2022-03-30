from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.combining import OrTrigger
from apscheduler.triggers.cron import CronTrigger
from daily_word_updater import getdailyword

def start():
    scheduler = BackgroundScheduler(timezone='America/New_York')
    trigger = OrTrigger([CronTrigger(hour=0, minute=0)])
    scheduler.add_job(getdailyword.update_daily_word, trigger)
    scheduler.start()