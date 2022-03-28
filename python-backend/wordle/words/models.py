from django.db import models

class Word(models.Model):
    id = models.AutoField(primary_key=True)
    word = models.CharField(max_length=16, null=False, blank=False)
    description = models.CharField(max_length=2048, null=True)
    num_of_letters = models.IntegerField(null=False)
    word_date = models.DateTimeField(auto_now_add=True, null=False, blank=False)

    class Meta:
        db_table = 'Word'
